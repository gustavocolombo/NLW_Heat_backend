import axios from "axios";

interface IAccessToken {
  access_token: string;
}

interface IUsersResponse {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
}

export default class AuthenticateUserService {
  async execute(code: String): Promise<any> {
    const url = "https://github.com/login/oauth/access_token";

    const { data: accessTokenResponse } = await axios.post<IAccessToken>(
      url,
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          "Accept" : "application/json"
        },
      }
    );

    const response = await axios.get<IUsersResponse>(
      "https://api.github.com/user",
      {
        headers: {
          authorization: `Bearer ${accessTokenResponse.access_token}`,
        },
      }
    );

    return response.data;
  }
}
