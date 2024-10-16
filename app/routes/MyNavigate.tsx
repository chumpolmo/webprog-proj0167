import { redirect } from "@remix-run/node";

export const loader = async ({ request }) => {
  // Some logic to determine if a redirect is necessary
  const shouldRedirect = true;

  if (shouldRedirect) {
    return redirect("/authens/myLogin");
  }

  return { data: "some data" };
};

export default function MyPage() {
  return <h1>This is My Page</h1>;
}
