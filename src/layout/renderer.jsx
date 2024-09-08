import { CONFIG } from "../config";
import DToolsLogo from "../assets/images/dtools.svg";
import { usePage } from "../providers/pageProvider";
import { Navigation, Text } from "@deriv-com/quill-ui";
import {
  LegacyCloseCircle1pxBlackIcon,
  LegacySettings1pxIcon,
  LegacySettings2pxIcon,
} from "@deriv/quill-icons/Legacy";
import { useEffect, useState } from "react";
import {
  StandaloneFileCircleInfoBoldIcon,
  StandaloneFileCircleInfoRegularIcon,
  StandaloneHouseBlankFillIcon,
  StandaloneHouseBlankRegularIcon,
} from "@deriv/quill-icons/Standalone";

const Renderer = () => {
  const { currentPage, pages, setCurrentPage } = usePage();
  const [activeMenu, setActiveMenu] = useState(0);
  const mainMenu = ["home", "changelog", "settings"];

  // Annoying lastpass UI breaking elements
  useEffect(() => {
    const removeLastPassIcons = () => {
      const elements = document.querySelectorAll(
        "div[data-lastpass-icon-root]"
      );
      elements.forEach((element) => {
        element.remove();
      });
    };

    removeLastPassIcons();

    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach(() => {
        removeLastPassIcons();
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    setActiveMenu(mainMenu.indexOf(currentPage));
  }, [currentPage]);

  return (
    <section className="dtool-menu-container">
      <div className="header-container">
        <div className="brand">
          <img src={DToolsLogo} alt="" />
          <Text bold>Dtools {CONFIG.VERSION}</Text>
        </div>
        <span className="action-btn">
          <LegacyCloseCircle1pxBlackIcon fill="#000000" iconSize="sm" />
        </span>
      </div>
      <div className="body-container">{pages[currentPage]}</div>

      <Navigation.Bottom
        onChange={(_, value) => {
          setActiveMenu(value);
          setCurrentPage(mainMenu[value]);
        }}
        value={activeMenu}
      >
        <Navigation.BottomAction
          activeIcon={<StandaloneHouseBlankFillIcon iconSize="sm" />}
          icon={<StandaloneHouseBlankRegularIcon iconSize="sm" />}
          label="Home"
        />
        <Navigation.BottomAction
          activeIcon={<StandaloneFileCircleInfoBoldIcon iconSize="sm" />}
          icon={<StandaloneFileCircleInfoRegularIcon iconSize="sm" />}
          label="Changelog"
        />
        <Navigation.BottomAction
          activeIcon={<LegacySettings2pxIcon iconSize="sm" width={18} />}
          icon={<LegacySettings1pxIcon iconSize="sm" width={18} />}
          label="Settings"
        />
      </Navigation.Bottom>
    </section>
  );
};

export default Renderer;
