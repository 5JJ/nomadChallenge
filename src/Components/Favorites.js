import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { accountApi } from "api";
import { useHistory } from "react-router-dom";
import { isLogin, getSessionId } from "Components/LoginToken";
import star_on from "../assets/star_on.svg";
import star_off from "../assets/star_off.svg";

const useFavoriteMark = (media_type, media_id) => {
  const [marked, setMarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const accountId = useRef(null);

  const marking = () => {
    if (!isLogin()) {
      history.push("/login");
      return;
    }
    if (!loading) {
      setLoading(true);
    }
  };

  useEffect(() => {
    if (loading) {
      const handleFavorites = async () => {
        try {
          const sessionId = getSessionId();
          if (!accountId.current) {
            const {
              data: { id: account_id },
              status,
              status_message,
            } = await accountApi.details(sessionId);

            if (status !== 200) {
              throw new Error(status_message);
            }
            accountId.current = account_id;
          }

          const {
            data: { success, status_message: err_message },
          } = await accountApi.markAsFavorites(sessionId, accountId.current, {
            media_type,
            media_id,
            favorite: !marked,
          });
          if (!success) {
            throw new Error(err_message);
          }
          setMarked(!marked);
        } catch (error) {
        } finally {
          setLoading(false);
        }
      };
      handleFavorites();
    }
  }, [loading]);
  return {
    marked,
    marking,
  };
};

const Favorites = ({ className, media_type, media_id }) => {
  console.log(className);
  const { marked, marking } = useFavoriteMark(media_type, media_id);
  return <Mark className={className} marked={marked} onClick={marking} />;
};

export default Favorites;

export const Mark = styled.span`
  display: inline-block;
  width: 30px;
  height: 30px;
  cursor: pointer;
  background-image: url(${({ marked }) => (marked ? star_on : star_off)});
  background-size: 30px;
`;
