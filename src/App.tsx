import { lazy, Suspense } from "react";
import Header from "./components/ui/Header";
import { sidebarAtom } from "./components/ui/Sidebar/sidebarAtom";
import { useAtom } from "jotai";
import Sidebar from "./components/ui/Sidebar";
import Spinner from "./components/ui/Spinner";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import clsx from "clsx";
const Home = lazy(() => import("./components/page/Home"));
const Search = lazy(() => import("./components/page/Search"));
const NotesLabel = lazy(() => import("./components/page/NotesLabel"));
import Redux from "./Redux";

export default function App() {
  const [visible] = useAtom(sidebarAtom);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Sidebar />
        <main
          className={clsx(
            "mx-4 flex flex-col items-center duration-200 ease-in-out",
            visible ? "pl-16 md:pl-72" : "pl-16"
          )}
        >
          <Switch>
            <Route exact path="/">
              <Suspense fallback={RenderLoader()}>
                <Home />
              </Suspense>
            </Route>
            <Route exact path="/search/:query">
              <Suspense fallback={RenderLoader()}>
                <Search />
              </Suspense>
            </Route>
            <Route exact path="/label/:labelName">
              <Suspense fallback={RenderLoader()}>
                <NotesLabel />
              </Suspense>
            </Route>
            <Route path="*">
              <Redux />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </>
  );
}

function RenderLoader() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Spinner />
    </div>
  );
}
