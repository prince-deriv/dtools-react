import { Breadcrumbs, Button, TextField } from "@deriv-com/quill-ui";
import {
  LabelPairedCircleStarCaptionRegularIcon,
  LabelPairedLinkSimpleXlFillIcon,
} from "@deriv/quill-icons/LabelPaired";
import { useState } from "react";
import { usePage } from "../../../providers/pageProvider";

const AppIdGenerator = () => {
  const [prefix, setPrefix] = useState("Dtools");
  const [link, setLink] = useState("app.deriv.com");
  const [isLoading, setLoading] = useState(false);
  const { setCurrentPage, setPageData } = usePage();

  const links = [
    {
      content: "Home",
      href: "home",
    },
    {
      content: "App ID Generator",
      href: "app-id-generator",
    },
  ];

  return (
    <div className="content-container">
      <Breadcrumbs size="sm" links={links} />
      <div className="scroll-container">
        <div className="form-container">
          <TextField
            placeholder=""
            label="Prefix"
            type="text"
            value={prefix}
            size="lg"
            leftIcon={<LabelPairedCircleStarCaptionRegularIcon />}
            onChange={(e) => setPrefix(e.target.value)}
          />
          <TextField
            placeholder=""
            label="App Link"
            type="text"
            value={link}
            size="lg"
            leftIcon={<LabelPairedLinkSimpleXlFillIcon />}
            onChange={(e) => setLink(e.target.value)}
          />
          <div className="action-container">
            <Button
              color="coral"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  setPageData({
                    prefix,
                    link,
                  });
                  setCurrentPage("app-id-generator-result");
                }, 1000);
              }}
              type="button"
              variant="primary"
              label="Generate ID"
              className="standard-btn"
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppIdGenerator;
