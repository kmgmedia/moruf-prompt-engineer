import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { isRouteErrorResponse, useRouteError, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const CHUNK_LOAD_ERROR_REGEX =
  /fetch dynamically imported module|error loading dynamically imported module|importing a module script failed/i;

const getErrorMessage = (error: unknown): string => {
  if (isRouteErrorResponse(error)) {
    return error.statusText || `Error ${error.status}`;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return typeof error === "string" ? error : "Something went wrong.";
};

export const RouteError = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const message = getErrorMessage(error);
  const isChunkLoadError = CHUNK_LOAD_ERROR_REGEX.test(message);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md text-center space-y-5">
        <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <AlertTriangle className="w-7 h-7 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            {isChunkLoadError ? "Connection Hiccup" : "Something Went Wrong"}
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            {isChunkLoadError
              ? "This page couldn't finish loading: usually a slow or dropped connection. Refresh to try again."
              : "This page ran into an unexpected error. Refreshing usually fixes it."}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button
            onClick={() => window.location.reload()}
            className="bg-primary hover:bg-primary/90"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Button variant="outline" onClick={() => navigate("/")}>
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};
