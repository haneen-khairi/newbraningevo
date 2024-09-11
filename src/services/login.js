import instance from "@/api/instance";

export default async function login({ email, password }) {
  return instance
    .post("Authentication/account/login", {
      login: email,
      password,
      loginType: 1,
    })
    .then((res) => res.data);
}

export async function loginByMicrosoftAccount(data) {
  return instance
    .get("saml/ValidateApi/UsingSamlToken", null, {
      headers: { authorization: `Bearer ${data}` },
    })
    .then((res) => {
      console.log(res.data);
      
      res.data});
}
