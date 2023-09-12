import React, { useEffect, useState } from "react";
import PlayersAdmin from "../../component/admin/PlayersAdmin";
import CreatePlayerForm from "../../component/admin/FormPlayer";
import { Card, Modal, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsShowCreatePlayerFormSelector,
  getUpdatePlayerFormDataSelector,
} from "../../redux/selectors";
import {
  setShowCreatePlayerForm,
  setUpdatePlayerFormData,
} from "../../redux/slices/adminSlice";
import { setLoading } from "../../redux/slices/loadingSlice";
import { playersAPI } from "../../services";
import { handleShowMessage } from "../../component/commons/Message";
import { PlayerType } from "../../types";

const PlayerAdminPage: React.FC = () => {
  const dispatch = useDispatch();
  const isShowCreatePlayerForm = useSelector(getIsShowCreatePlayerFormSelector);
  const updatePlayerFormData = useSelector(getUpdatePlayerFormDataSelector);
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [filterPlayers, setFilterPlayers] = useState<"current" | "legend">(
    "current"
  );
  const titleModal = isShowCreatePlayerForm
    ? "Create Player Form"
    : "Update Player Form";

  const handleGetPlayers = async () => {
    try {
      dispatch(setLoading(true));
      const resultPlayersApi = await playersAPI(filterPlayers);
      if (resultPlayersApi.data.result) {
        setPlayers(resultPlayersApi.data.data);
      } else {
        handleShowMessage("error", "System error .Please try again!");
      }
    } catch (error) {
      console.log(error);
      handleShowMessage("error", "System error .Please try again!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleCloseModal = () => {
    if (isShowCreatePlayerForm) {
      dispatch(setShowCreatePlayerForm(false));
    }
    if (updatePlayerFormData) {
      dispatch(setUpdatePlayerFormData(null));
    }
  };

  useEffect(() => {
    handleGetPlayers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterPlayers]);

  return (
    <div className="player-admin-page">
      <Card className="mb-3">
        <span className="me-3">Filter by: </span>
        <Radio.Group
          onChange={(e) => setFilterPlayers(e.target.value)}
          value={filterPlayers}
        >
          <Radio value="current">Current Player</Radio>
          <Radio value="legend">Legend</Radio>
        </Radio.Group>
      </Card>
      <PlayersAdmin players={players} playerTitle={filterPlayers} />

      <Modal
        title={titleModal}
        destroyOnClose={true}
        open={isShowCreatePlayerForm || !!updatePlayerFormData}
        onCancel={handleCloseModal}
        footer={null}
      >
        <CreatePlayerForm onSuccess={() => handleGetPlayers()} />
      </Modal>
    </div>
  );
};

export default PlayerAdminPage;
