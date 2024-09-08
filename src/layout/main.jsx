import { BreakpointProvider, ThemeProvider } from "@deriv-com/quill-ui";
import "../assets/styles/global.scss";
import { PageProvider } from "../providers/pageProvider";
import Renderer from "./renderer";
import BreadcrumbHandler from "../components/breadcrumb-handler";

const Main = () => {
  return (
    <ThemeProvider theme={"light"}>
      <PageProvider>
        <BreakpointProvider>
          <BreadcrumbHandler>
            <Renderer />
          </BreadcrumbHandler>
        </BreakpointProvider>
      </PageProvider>
    </ThemeProvider>
  );
};

export default Main;
