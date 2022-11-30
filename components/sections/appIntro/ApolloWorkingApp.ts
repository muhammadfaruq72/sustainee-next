import { gql, useQuery, useMutation } from "@apollo/client";

export function Query() {
  const query = gql`
    query {
      hello
    }
  `;

  //const { loading, error, data } = useQuery(query);

  //console.log(data);
}

export default function Mutation() {
  const MUTATION = gql`
    mutation ($file: Upload!) {
      RemoveBG(file: $file) {
        imageFile
      }
    }
  `;
  return useMutation(MUTATION, {
    onCompleted(data) {
      console.log("onCompleted", data);
    },
  });
}
