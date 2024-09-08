import { Breadcrumbs, Text, ToggleSwitch } from "@deriv-com/quill-ui";
import { usePage } from "../providers/pageProvider";

const Settings = () => {
  const { settings, setSettings } = usePage();
  const { is_dark_mode } = settings;

  const links = [
    {
      content: "Home",
      href: "home",
    },
    {
      content: "Settings",
    },
  ];

  return (
    <div className="content-container">
      <Breadcrumbs size="sm" links={links} />
      <div className="scroll-container">
        <div className="setting-box">
          <div className="setting-item">
            <Text>Dark Mode</Text>
            <ToggleSwitch
              checked={is_dark_mode}
              onChange={(e) => setSettings({ is_dark_mode: e ? 1 : 0 })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
