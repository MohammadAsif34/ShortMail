import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  trashMails,
  starredMails,
  readMails,
  archivedMails,
} from "../redux/emailSlice";

export const useEmailActions = () => {
  const dispatch = useDispatch();

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    const res = await dispatch(trashMails(id)).unwrap();
    res.status === "success"
      ? toast.success(res.message)
      : toast.error(res.message);
  };

  const handleStarred = async (e, id) => {
    e.stopPropagation();
    const res = await dispatch(starredMails(id)).unwrap();
    res.status === "success"
      ? toast.success(res.message)
      : toast.error(res.message);
  };

  const handleRead = async (e, id) => {
    e.stopPropagation();
    const res = await dispatch(readMails(id)).unwrap();
    res.status === "success"
      ? toast.success(res.message)
      : toast.error(res.message);
  };

  const handleArchived = async (e, id) => {
    e.stopPropagation();
    const res = await dispatch(archivedMails(id)).unwrap();
    res.status === "success"
      ? toast.success(res.message)
      : toast.error(res.message);
  };

  return { handleDelete, handleStarred, handleRead, handleArchived };
};
