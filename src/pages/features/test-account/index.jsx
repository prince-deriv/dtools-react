import {
  Breadcrumbs,
  Button,
  TextField,
  PasswordField,
  InputDropdown,
} from "@deriv-com/quill-ui";
import { useState } from "react";
import { usePage } from "../../../providers/pageProvider";
import {
  IllustrativeDropEmailIcon,
  IllustrativeStrongPasswordsIcon,
} from "@deriv/quill-icons/Illustrative";
import {
  LabelPairedFlagCheckeredCaptionRegularIcon,
  LabelPairedMoneyBillLgRegularIcon,
  LabelPairedQrcodeLgRegularIcon,
} from "@deriv/quill-icons/LabelPaired";
import {
  brokerCodes,
  countryCodes,
  currencies,
  otherAccounts,
} from "../../../config";
import { DerivLightAccountIcon } from "@deriv/quill-icons/Illustration";
const TestAccountGenerator = () => {
  const [email, setEmail] = useState("dtools@deriv.com");
  const [password, setPassword] = useState("Abcd1234");
  const [brokerCode, setBrokerCode] = useState(brokerCodes[1]);
  const [countryCode, setCountryCode] = useState(countryCodes[0].code);
  const [currency, setCurrency] = useState(currencies[0]);
  const [accountType, setAccountType] = useState(otherAccounts[0].value);
  const [isLoading, setLoading] = useState(false);
  const { setCurrentPage, setPageData } = usePage();

  const links = [
    {
      content: "Home",
      href: "home",
    },
    {
      content: "Test Account",
      href: "test-account-generator",
    },
  ];

  return (
    <div className="content-container">
      <Breadcrumbs size="sm" links={links} />
      <div className="scroll-container">
        <div className="form-container">
          <TextField
            label="Email"
            type="text"
            value={email}
            size="lg"
            leftIcon={<IllustrativeDropEmailIcon />}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordField
            leftIcon={<IllustrativeStrongPasswordsIcon />}
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputDropdown
            inputSize="lg"
            leftIcon={<LabelPairedQrcodeLgRegularIcon />}
            label="Broker Code"
            onSelectOption={(e) => setBrokerCode(e)}
            options={brokerCodes.map((code) => ({
              text: code,
              value: code,
            }))}
            status="neutral"
            value={brokerCode}
          />
          <InputDropdown
            inputSize="lg"
            leftIcon={<LabelPairedFlagCheckeredCaptionRegularIcon />}
            label="Country"
            onSelectOption={(e) => setCountryCode(e)}
            options={countryCodes.map(({ code, name }) => ({
              text: `${name}(${code})`,
              value: code,
            }))}
            status="neutral"
            value={countryCode}
          />
          <InputDropdown
            inputSize="lg"
            leftIcon={<LabelPairedMoneyBillLgRegularIcon />}
            label="Currency"
            onSelectOption={(e) => setCurrency(e)}
            options={currencies.map((currency) => ({
              text: currency,
              value: currency,
            }))}
            status="neutral"
            value={currency}
          />
          <InputDropdown
            inputSize="lg"
            leftIcon={<DerivLightAccountIcon />}
            label="Account Type"
            onSelectOption={(e) => setAccountType(e)}
            options={otherAccounts.map(({ title, value }) => ({
              text: title,
              value,
            }))}
            status="neutral"
            value={accountType}
          />
          <div className="action-container">
            <Button
              color="coral"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  setPageData({
                    email,
                    password,
                    brokerCode,
                    countryCode,
                    currency,
                    accountType,
                  });
                  setCurrentPage("test-account-generator-result");
                }, 1000);
              }}
              type="button"
              variant="primary"
              label="Generate Code"
              className="standard-btn"
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestAccountGenerator;
