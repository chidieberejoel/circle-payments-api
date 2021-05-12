import { gql } from "apollo-server-express";
import client from "../base/base";
import { user, req } from "../base/data";

const userTest = () => describe("User Mutations/Query", () => {
  it("register a user", async () => {
    const SIGNUP_USER = gql`
        mutation signup($auth: SignupInput!) {
          signup(input: $auth) {
            id
            email
            firstName
            lastName
            isActive
            level
            createdAt
            updatedAt
          }
        }
      `;

    const response = await client.mutate({
      mutation: SIGNUP_USER,
      variables: {
        auth: {
          email: "chidiebereyjoel@gmail.com",
          password: "A123456789z",
          firstName: "chidiebere",
          lastName: "joel",
        },
      },
    });

    user.data = response.data.signup;
    expect(response.data.signup).toHaveProperty("id");
    expect(response.data.signup.level).toBe("basic");
  });

  it("login a user", async () => {
    const LOGIN_USER = gql`
        mutation signin($auth: SigninInput!) {
          signin(input: $auth) {
            user {
              id
              firstName
              lastName
              isActive
              level
              createdAt
              updatedAt
            }
            token
          }
        }
      `;

    const response = await client.mutate({
      mutation: LOGIN_USER,
      variables: {
        auth: {
          email: "chidiebereyjoel@gmail.com",
          password: "A123456789z",
        },
      },
    });

    req.headers.authorization = response.data.signin.token;
    expect(response.data.signin).toHaveProperty("token");
  });

  it("fetch user details", async () => {
    const USER_DETAILS = gql`
        query {
          me {
            id
            email
            firstName
            lastName
            isActive
            level
          }
        }
      `;

    const response = (await client.query({ query: USER_DETAILS })).data.me;
    expect(response.email).toEqual(user.data.email);
    expect(response).toHaveProperty("level");
  });
});

export default userTest;
