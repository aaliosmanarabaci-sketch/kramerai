import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SavedIdeasProvider } from "@/contexts/SavedIdeasContext";
import Home from "@/pages/Home";
import SavedIdeas from "@/pages/SavedIdeas";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/saved" component={SavedIdeas} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SavedIdeasProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </SavedIdeasProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
