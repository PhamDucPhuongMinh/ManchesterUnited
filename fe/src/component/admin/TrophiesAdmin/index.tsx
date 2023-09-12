import { Card, Empty, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Image } from "antd";
import { TrophyType } from "../../../types";
import { deleteTrophyAPI, trophiesAPI } from "../../../services";
import "./index.scss";
import CreateTrophyForm from "../FormTrophy";
import { handleShowMessage } from "../../commons/Message";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/slices/loadingSlice";
import { setUpdateTrophyFormData } from "../../../redux/slices/adminSlice";
import { getUpdateTrophyFormDataSelector } from "../../../redux/selectors";
import { WarningFilled } from "@ant-design/icons";

const TrophiesAdmin: React.FC = () => {
  const dispatch = useDispatch();
  const updateTrophyFormData = useSelector(getUpdateTrophyFormDataSelector);
  const [trophyList, setTrophyList] = useState<TrophyType[]>([]);
  const [isShowCreateTrophyForm, setIsShowCreateTrophyForm] = useState(false);
  const [deletedTrophy, setDeletedTrophy] = useState<TrophyType | null>(null);

  const handleGetTrophiesData = async () => {
    dispatch(setLoading(true));
    try {
      const resultTrophiesApi = await trophiesAPI();
      if (resultTrophiesApi.data.result) {
        setTrophyList(resultTrophiesApi.data.data);
      } else {
        handleShowMessage(
          "error",
          resultTrophiesApi.data.msg ||
            "Get failed trophies data. Please try again."
        );
      }
    } catch (error) {
      console.log(error);
      handleShowMessage("error", "System error. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleUpdate = (trophy: TrophyType) => {
    dispatch(setUpdateTrophyFormData(trophy));
  };

  const handleDeleteTrophy = async () => {
    dispatch(setLoading(true));
    try {
      if (deletedTrophy) {
        const resultDeleteTrophyApi = await deleteTrophyAPI(deletedTrophy.Id);
        if (resultDeleteTrophyApi.data.result) {
          handleShowMessage(
            "success",
            resultDeleteTrophyApi.data.msg || "Delete success trophy."
          );
          setTrophyList((prev) =>
            prev.filter((item) => item.Id !== deletedTrophy.Id)
          );
        } else {
          handleShowMessage(
            "error",
            resultDeleteTrophyApi.data.msg ||
              "Delete failed trophy. Please try again."
          );
        }
      }
    } catch (error) {
      console.log(error);
      handleShowMessage("error", "System error. Please try again.");
    } finally {
      setDeletedTrophy(null);
      dispatch(setLoading(false));
    }
  };

  const handleCloseFormModal = () => {
    if (isShowCreateTrophyForm) {
      setIsShowCreateTrophyForm(false);
    }
    if (updateTrophyFormData) {
      dispatch(setUpdateTrophyFormData(null));
    }
  };

  useEffect(() => {
    handleGetTrophiesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="trophies-admin">
      <Card>
        <div className="d-flex flex-wrap align-items-center justify-content-between mb-3">
          <h4 className="mb-0">Trophy List</h4>
          <button
            id="btn-create-trophy-admin"
            className="btn btn-success btn-lg d-flex align-items-center"
            onClick={() => setIsShowCreateTrophyForm(true)}
          >
            <img src="/assets/icons/trophy-solid.png" alt="" width={15} />
            <span className="ms-2">Create trophy</span>
          </button>
        </div>
        <div className="table-responsive hidden-scrollbar">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col" style={{ minWidth: 200 }}>
                  <span className="me-1">Name</span>
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ minWidth: 150 }}
                >
                  <span className="me-1">Image</span>
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ minWidth: 250 }}
                >
                  <span className="me-1">Summary</span>
                </th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {trophyList.length > 0 ? (
                trophyList.map((item, index) => {
                  return (
                    <tr key={item.Id}>
                      <th scope="row" className="align-middle">
                        {index + 1}
                      </th>
                      <td>
                        <div className="d-flex align-items-center">
                          <Image
                            src={item.TrophyImage}
                            className="img-trophy rounded"
                          />
                          <span className="ms-2 text-nowrap">{item.Name}</span>
                        </div>
                      </td>
                      <td className="text-center align-middle">
                        <Image
                          src={item.WinnerTeamImage}
                          className="img-winner-team rounded"
                        />
                      </td>
                      <td className="align-middle">
                        <p className="mb-0 mx-3 text-overflow-2">
                          {item.Summary}
                        </p>
                      </td>
                      <td className="text-center align-middle">
                        <div className="d-flex flex-nowrap justify-content-center mx-3">
                          <button
                            className="btn-action btn-editing mx-1 btn btn-primary"
                            onClick={() => handleUpdate(item)}
                          >
                            <img src="/assets/icons/editing.png" alt="" />
                          </button>
                          <button
                            className="btn-action btn-delete mx-1 btn btn-danger"
                            onClick={() => setDeletedTrophy(item)}
                          >
                            <img src="/assets/icons/trash.png" alt="" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="border-0">
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      className="mb-0"
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        open={!!deletedTrophy}
        onCancel={() => setDeletedTrophy(null)}
        okButtonProps={{ className: "bg-danger" }}
        onOk={handleDeleteTrophy}
        title={
          <p className="mb-0 d-flex align-items-center">
            <WarningFilled className="text-danger fs-1" />
            <span className="ms-3">
              Do you want to delete {deletedTrophy?.Name} trophy?
            </span>
          </p>
        }
      ></Modal>

      <Modal
        title={updateTrophyFormData ? "Update trophy" : "Create trophy"}
        destroyOnClose={true}
        open={isShowCreateTrophyForm || !!updateTrophyFormData}
        onCancel={handleCloseFormModal}
        footer={null}
      >
        <CreateTrophyForm
          onSuccess={() => {
            handleGetTrophiesData();
            setIsShowCreateTrophyForm(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default TrophiesAdmin;
