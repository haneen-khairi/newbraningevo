import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AuthGuard(props) {
  const { user, token } = useSelector((state) => state.auth);
  console.log("🚀 ~ AuthGuard ~ token:", token)

  console.log("🚀 ~ AuthGuard ~ user:", user)
  const location = useLocation();
  const { children } = props;
  const isPrivate = children.type?.isPrivate ?? false;
  const isPublic = !!children.type?.isPublic;

  if (!isPrivate && !isPublic) {
    return <>{children}</>;
  }

  if (isPrivate && !user) {
    let previousPage = location.pathname;
    return <Navigate to={"/auth/login?from=" + previousPage} />;
  }
  if (isPublic && user) {
    return <Navigate to={"/dashboard"} />;
  }

  return <>{children}</>;
}
