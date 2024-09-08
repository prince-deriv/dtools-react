import { Button } from "@deriv-com/quill-ui";
import { LegacyIdNumberIcon } from "@deriv/quill-icons/Legacy";
import { usePage } from "../providers/pageProvider";
import { DerivLightAccountIcon } from "@deriv/quill-icons/Illustration";

const Home = () => {
  const { setCurrentPage } = usePage();

  const menus = [
    {
      icon: <LegacyIdNumberIcon fill="#fffff" iconSize="sm" />,
      action: () => {
        setCurrentPage("app-id-generator");
      },
      label: "App ID Generator",
    },
    {
      icon: <DerivLightAccountIcon height="120px" width="120px" />,
      action: () => {
        setCurrentPage("test-account-generator");
      },
      label: "Add Test Account",
    },
  ];

  return (
    <div className="menu-container">
      {menus.map(({ label, action, icon }, mkey) => (
        <Button
          key={`menu-${label}-${mkey}`}
          icon={icon}
          color="coral"
          label={label}
          className="menu-btn"
          size="sm"
          onClick={action}
        />
      ))}
    </div>
  );
};

export default Home;
