import { Checkbox, Col, Form, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { accountsPermissionsMap, eventsPermissionsMap, hospitalityPermissionsMap, organizationPermissionsMap, permissionsMap, prPermissionsMap, vipPermissionsMap } from "./permissions";

export default function SystemAdminForm({ mapDrawerOpen, onSubmit, users }) {
  const [form] = Form.useForm();
  const { t, i18n } = useTranslation();
  const mode = mapDrawerOpen?.id ? "update" : "create";
  const usersOptions = users.data.items?.map((el) => {
    return {
      label: (i18n.language=="ar"?el.fullName:record.fullNameEn)?.split("@")[0],
      value: el.userId,
    };
  });

  const servicesOptions = [
    {
      value: 1,
      label: t("shuttle-transport"),
    },
    {
      value: 2,
      label: t("hospitality"),
    },
    {
      value: 3,
      label: t("orgHeadquarters"),
    },
    {
      value: 4,
      label: t("vipCar"),
    },
    {
      value: 5,
      label: t("permission"),
    },
    {
      value: 6,
      label: t("events"),
    },
    {
      value: 7,
      label: t("theAccounts"),
    },
  ];

  //Permissions
  const allPermissionTypes = ["display", "add", "edit", "delete"];
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const allPermissions = {
    ...vipPermissionsMap,
    ...permissionsMap,
    ...hospitalityPermissionsMap,
    ...accountsPermissionsMap,
    ...eventsPermissionsMap,
    ...prPermissionsMap,
    ...organizationPermissionsMap
  };

  const handleCheckboxChange = (category, permissionType) => {
    const permission = allPermissions[category][permissionType];
    setSelectedPermissions((prevState) =>
      prevState.includes(permission)
        ? prevState.filter((p) => p !== permission)
        : [...prevState, permission]
    );
  };

  function removeSelectedPermissions(allPermissions, selectedPermissions) {
    let allOfPermissions = [];
    for (const category in allPermissions) {
      if (Object.prototype.hasOwnProperty.call(allPermissions, category)) {
        const element = allPermissions[category];
        for (const permission in allPermissions[category]) {
          if (Object.prototype.hasOwnProperty.call(allPermissions[category], permission)) {
            const el = allPermissions[category][permission];
            allOfPermissions.push(el)
          }
        }
        
      }
    }
    return allOfPermissions.filter(element => !selectedPermissions.includes(element));;
  }


  const deletedPermissions =removeSelectedPermissions(allPermissions, selectedPermissions);

  const [displayUsePermissions, setDisplayUsePermissions] = useState([]);
  useEffect(() => {
    if (mode == "update") {
      //setFieldsValues
    }
  }, []);

  return (
    <>
      <Form
        form={form}
        onFinish={(values) => {
          values.mode = mode;
          values.id = mapDrawerOpen?.id;
          values.permissions=selectedPermissions;
          values.deletedPermissions=deletedPermissions;
          onSubmit(values);
        }}
        id="authority-form"
        className="flex flex-col"
        layout="vertical"
      >
        <Form.Item label={t("userName")} name={"userName"}>
          <Select
            suffixIcon={
              <svg
                width="15"
                height="7"
                viewBox="0 0 16 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.76913 5.51617C8.66842 5.61771 8.5486 5.6983 8.41659 5.7533C8.28457 5.8083 8.14298 5.83661 7.99996 5.83661C7.85695 5.83661 7.71535 5.8083 7.58334 5.7533C7.45133 5.6983 7.33151 5.61771 7.2308 5.51617L2.26913 0.543668C2.16842 0.442129 2.0486 0.361534 1.91659 0.306535C1.78457 0.251535 1.64298 0.223219 1.49996 0.223219C1.35695 0.223219 1.21535 0.251535 1.08334 0.306535C0.951324 0.361534 0.831506 0.442129 0.730796 0.543668C0.529025 0.746644 0.415771 1.02122 0.415771 1.30742C0.415771 1.59362 0.529025 1.86819 0.730796 2.07117L5.7033 7.04367C6.31267 7.65229 7.13871 7.99414 7.99996 7.99414C8.86122 7.99414 9.68725 7.65229 10.2966 7.04367L15.2691 2.07117C15.4693 1.86938 15.5821 1.59704 15.5833 1.31283C15.5841 1.17026 15.5568 1.02892 15.5029 0.896934C15.449 0.764943 15.3695 0.644894 15.2691 0.543667C15.1684 0.442128 15.0486 0.361533 14.9166 0.306534C14.7846 0.251534 14.643 0.223219 14.5 0.223219C14.357 0.223219 14.2154 0.251534 14.0833 0.306534C13.9513 0.361534 13.8315 0.442128 13.7308 0.543667L8.76913 5.51617Z"
                  fill="#38ACB1"
                />
              </svg>
            }
            options={usersOptions}
            placeholder={t("userName")}
          ></Select>
        </Form.Item>

        <Form.Item label={t("adminPermissions")} name={"permissions"}>
          <Select
            mode="multiple"
            suffixIcon={
              <svg
                width="15"
                height="7"
                viewBox="0 0 16 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.76913 5.51617C8.66842 5.61771 8.5486 5.6983 8.41659 5.7533C8.28457 5.8083 8.14298 5.83661 7.99996 5.83661C7.85695 5.83661 7.71535 5.8083 7.58334 5.7533C7.45133 5.6983 7.33151 5.61771 7.2308 5.51617L2.26913 0.543668C2.16842 0.442129 2.0486 0.361534 1.91659 0.306535C1.78457 0.251535 1.64298 0.223219 1.49996 0.223219C1.35695 0.223219 1.21535 0.251535 1.08334 0.306535C0.951324 0.361534 0.831506 0.442129 0.730796 0.543668C0.529025 0.746644 0.415771 1.02122 0.415771 1.30742C0.415771 1.59362 0.529025 1.86819 0.730796 2.07117L5.7033 7.04367C6.31267 7.65229 7.13871 7.99414 7.99996 7.99414C8.86122 7.99414 9.68725 7.65229 10.2966 7.04367L15.2691 2.07117C15.4693 1.86938 15.5821 1.59704 15.5833 1.31283C15.5841 1.17026 15.5568 1.02892 15.5029 0.896934C15.449 0.764943 15.3695 0.644894 15.2691 0.543667C15.1684 0.442128 15.0486 0.361533 14.9166 0.306534C14.7846 0.251534 14.643 0.223219 14.5 0.223219C14.357 0.223219 14.2154 0.251534 14.0833 0.306534C13.9513 0.361534 13.8315 0.442128 13.7308 0.543667L8.76913 5.51617Z"
                  fill="#38ACB1"
                />
              </svg>
            }
            placeholder={t("adminPermissions")}
            options={servicesOptions}
            onChange={(value) => setDisplayUsePermissions(value)}
          ></Select>
        </Form.Item>

        {displayUsePermissions.includes(1) ? (
          <>
            <div className="bg-gray-100 px-2 py-4 rounded-2xl">
              {t("shuttle-transport")}
            </div>

            {Object.keys(permissionsMap).map((category) => (
              <div key={category} className={category}>
                <Row className="my-4">
                  <Col span={8}>
                    {t(`${category}`)}
                  </Col>

                  <Col span={16}>
                    <div className="flex gap-8 justify-end">
                      {allPermissionTypes.map((permissionType) => {
                        const isDisabled =
                          !permissionsMap[category]?.[permissionType];
                        return (
                          <Checkbox
                            key={permissionType}
                            onChange={() =>
                              handleCheckboxChange(category, permissionType)
                            }
                            disabled={isDisabled}
                          >
                            {t(`${permissionType}`)}
                          </Checkbox>
                        );
                      })}
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </>
        ) : (
          ""
        )}

        {displayUsePermissions.includes(4) ? (
          <>
            <div className="bg-gray-100 px-2 py-4 rounded-2xl">
              {t("vipCar")}
            </div>

            {Object.keys(vipPermissionsMap).map((category) => (
              <div key={category} className={category}>
                <Row className="my-4">
                  <Col span={8}>
                  {t(`${category}`)}
                  </Col>

                  <Col span={16}>
                    <div className="flex gap-8 justify-end">
                      {allPermissionTypes.map((permissionType) => {
                        const isDisabled =
                          !vipPermissionsMap[category]?.[permissionType];
                        return (
                          <Checkbox
                            key={permissionType}
                            onChange={() =>
                              handleCheckboxChange(category, permissionType)
                            }
                            disabled={isDisabled}
                          >
                            {t(`${permissionType}`)}
                          </Checkbox>
                        );
                      })}
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </>
        ) : (
          ""
        )}

        {displayUsePermissions.includes(2) ? (
          <>
            <div className="bg-gray-100 px-2 py-4 rounded-2xl">
              {t("hospitality")}
            </div>

            {Object.keys(hospitalityPermissionsMap).map((category) => (
              <div key={category} className={category}>
                <Row className="my-4">
                  <Col span={8}>
                    {t(`${category}`)}
                  </Col>

                  <Col span={16}>
                    <div className="flex gap-8 justify-end">
                      {allPermissionTypes.map((permissionType) => {
                        const isDisabled =
                          !hospitalityPermissionsMap[category]?.[
                            permissionType
                          ];
                        return (
                          <Checkbox
                            key={permissionType}
                            onChange={() =>
                              handleCheckboxChange(category, permissionType)
                            }
                            disabled={isDisabled}
                          >
                            {t(`${permissionType}`)}
                          </Checkbox>
                        );
                      })}
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </>
        ) : (
          ""
        )}

        {displayUsePermissions.includes(7) ? (
          <>
            <div className="bg-gray-100 px-2 py-4 rounded-2xl">
              {t("theAccounts")}
            </div>

            {Object.keys(accountsPermissionsMap).map((category) => (
              <div key={category} className={category}>
                <Row className="my-4">
                  <Col span={8}>
                    {t(`${category}`)}
                  </Col>

                  <Col span={16}>
                    <div className="flex gap-8 justify-end">
                      {allPermissionTypes.map((permissionType) => {
                        const isDisabled =
                          !accountsPermissionsMap[category]?.[permissionType];
                        return (
                          <Checkbox
                            key={permissionType}
                            onChange={() =>
                              handleCheckboxChange(category, permissionType)
                            }
                            disabled={isDisabled}
                          >
                            {t(`${permissionType}`)}
                          </Checkbox>
                        );
                      })}
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </>
        ) : (
          ""
        )}

        {displayUsePermissions.includes(6) ? (
          <>
            <div className="bg-gray-100 px-2 py-4 rounded-2xl">
              {t("events")}
            </div>

            {Object.keys(eventsPermissionsMap).map((category) => (
              <div key={category} className={category}>
                <Row className="my-4">
                  <Col span={8}>
                    {t(`${category}`)}
                  </Col>

                  <Col span={16}>
                    <div className="flex gap-8 justify-end">
                      {allPermissionTypes.map((permissionType) => {
                        const isDisabled =
                          !eventsPermissionsMap[category]?.[permissionType];
                        return (
                          <Checkbox
                            key={permissionType}
                            onChange={() =>
                              handleCheckboxChange(category, permissionType)
                            }
                            disabled={isDisabled}
                          >
                            {t(`${permissionType}`)}
                          </Checkbox>
                        );
                      })}
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </>
        ) : (
          ""
        )}

        {displayUsePermissions.includes(5) ? (
          <>
            <div className="bg-gray-100 px-2 py-4 rounded-2xl">
              {t("permission")}
            </div>

            {Object.keys(prPermissionsMap).map((category) => (
              <div key={category} className={category}>
                <Row className="my-4">
                  <Col span={8}>
                    {t(`${category}`)}
                  </Col>

                  <Col span={16}>
                    <div className="flex gap-8 justify-end">
                      {allPermissionTypes.map((permissionType) => {
                        const isDisabled =
                          !prPermissionsMap[category]?.[permissionType];
                        return (
                          <Checkbox
                            key={permissionType}
                            onChange={() =>
                              handleCheckboxChange(category, permissionType)
                            }
                            disabled={isDisabled}
                          >
                            {t(`${permissionType}`)}
                          </Checkbox>
                        );
                      })}
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </>
        ) : (
          ""
        )}

        {displayUsePermissions.includes(3) ? (
          <>
            <div className="bg-gray-100 px-2 py-4 rounded-2xl">
              {t("orgHeadquarters")}
            </div>

            {Object.keys(organizationPermissionsMap).map((category) => (
              <div key={category} className={category}>
                <Row className="my-4">
                  <Col span={8}>
                    {t(`${category}`)}
                  </Col>

                  <Col span={16}>
                    <div className="flex gap-8 justify-end">
                      {allPermissionTypes.map((permissionType) => {
                        const isDisabled =
                          !organizationPermissionsMap[category]?.[permissionType];
                        return (
                          <Checkbox
                            key={permissionType}
                            onChange={() =>
                              handleCheckboxChange(category, permissionType)
                            }
                            disabled={isDisabled}
                          >
                            {t(`${permissionType}`)}
                          </Checkbox>
                        );
                      })}
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </>
        ) : (
          ""
        )}
      </Form>
    </>
  );
}
