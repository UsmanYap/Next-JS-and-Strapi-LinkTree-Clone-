import api from ".";

const ENDPOINT = {
  ACCOUNT: "/accounts",
};

const getAllAccounts = async () => {
  try {
    const accounts = await api.get(ENDPOINT.ACCOUNT);
    console.log(accounts);
    return accounts;
  } catch (err) {
    throw Error(err);
  }
};

const getSelectedAccount = async (slug) => {
  try {
    const getSelectedAccount = await api.get(`${ENDPOINT.ACCOUNT}?filters[slug][$eqi]=${slug}&populate=*`);
    console.log(getSelectedAccount);
    return getSelectedAccount;
  } catch (err) {
    throw Error(err);
  }
};
export { getAllAccounts, getSelectedAccount };
