import React, { useEffect, useState } from "react";
import { Card, Empty, Image, Modal } from "antd";
import { WarningFilled } from "@ant-design/icons";
import * as lodash from "lodash";
import "./index.scss";
import { useDispatch } from "react-redux";
import {
  setShowCreatePlayerForm,
  setUpdatePlayerFormData,
} from "../../../redux/slices/adminSlice";
import { PlayerType } from "../../../types";
import { deletePlayerAPI } from "../../../services";
import { handleShowMessage } from "../../commons/Message";
import { setLoading } from "../../../redux/slices/loadingSlice";

interface Props {
  players: PlayerType[];
  playerTitle: "current" | "legend";
}

const PlayersAdmin: React.FC<Props> = ({ players, playerTitle }) => {
  const dispatch = useDispatch();
  const [playerList, setPlayerList] = useState(players);
  const [playerDelete, setPlayerDelete] = useState<PlayerType | null>(null);

  const handleSortByPosition = (orderBy: "asc" | "desc") => {
    const goalkeepers: PlayerType[] = [];
    const defenders: PlayerType[] = [];
    const midfielders: PlayerType[] = [];
    const forwards: PlayerType[] = [];
    players.forEach((item) => {
      item.Position === "Goalkeeper"
        ? goalkeepers.push(item)
        : item.Position === "Defender"
        ? defenders.push(item)
        : item.Position === "Midfielder"
        ? midfielders.push(item)
        : forwards.push(item);
    });
    if (orderBy === "asc") {
      return [...goalkeepers, ...defenders, ...midfielders, ...forwards];
    } else {
      return [...forwards, ...midfielders, ...defenders, ...goalkeepers];
    }
  };

  const handleSortPlayer = (
    key: "Name" | "Nation" | "Position" | "ShirtNumber" | "Goals" | "Aperrances"
  ) => {
    const btnClickEle: HTMLElement | null = document.querySelector(
      `#btn-lodash-${key}`
    );
    // Disable OrderBy current CSS
    const btnIsAsc = document.querySelector(
      `.btn-lodash--asc:not(#btn-lodash-${key})`
    );
    const btnIsDesc = document.querySelector(
      `.btn-lodash--desc:not(#btn-lodash-${key})`
    );
    btnIsAsc?.classList.remove("btn-lodash--asc");
    btnIsDesc?.classList.remove("btn-lodash--desc");
    if (btnClickEle) {
      // asc -> desc
      if (btnClickEle.classList.contains("btn-lodash--asc")) {
        btnClickEle.classList.remove("btn-lodash--asc");
        btnClickEle.classList.add("btn-lodash--desc");
        if (key === "Position") {
          setPlayerList(handleSortByPosition("desc"));
        } else {
          setPlayerList(lodash.orderBy(players, [key], ["desc"]));
        }
      }
      // desc -> none
      else if (btnClickEle.classList.contains("btn-lodash--desc")) {
        btnClickEle.classList.remove("btn-lodash--desc");
        setPlayerList(players);
      }
      // none -> asc
      else {
        btnClickEle.classList.add("btn-lodash--asc");
        if (key === "Position") {
          setPlayerList(handleSortByPosition("asc"));
        } else {
          setPlayerList(lodash.orderBy(players, [key], ["asc"]));
        }
      }
    }
  };

  const handleDeletePlayer = async () => {
    if (playerDelete) {
      dispatch(setLoading(true));
      try {
        const resultDeletePlayer = await deletePlayerAPI(playerDelete.Id);
        if (resultDeletePlayer.data.result) {
          handleShowMessage(
            "success",
            resultDeletePlayer.data.msg || "Delete successful player!"
          );
          setPlayerList(
            playerList.filter((item) => item.Id !== playerDelete.Id)
          );
          setPlayerDelete(null);
        } else {
          handleShowMessage(
            "error",
            resultDeletePlayer.data.msg ||
              "Delete failed player. Please try again!"
          );
        }
      } catch (error) {
        console.log(error);
        handleShowMessage("error", "System error. Please try again!");
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  useEffect(() => {
    setPlayerList(players);
  }, [players]);

  return (
    <div className="players-admin">
      <Card>
        <div className="d-flex flex-wrap align-items-center justify-content-between mb-3">
          <h4 className="mb-0">Player List</h4>
          <button
            id="btn-create-player-admin"
            className="btn btn-success btn-lg d-flex align-items-center"
            onClick={() => dispatch(setShowCreatePlayerForm(true))}
          >
            <img src="/assets/icons/shirt.png" alt="" width={15} />
            <span className="ms-2">Create player</span>
          </button>
        </div>
        <div className="table-responsive hidden-scrollbar">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">
                  <div
                    className="d-flex align-items-center pe-pointer"
                    onClick={() => handleSortPlayer("Name")}
                  >
                    <span className="me-1">Name</span>
                    <button className="btn-lodash" id="btn-lodash-Name">
                      <img
                        className="btn-lodash__up"
                        src="/assets/icons/arrow-up.png"
                        alt=""
                        width={10}
                      />
                      <img
                        className="btn-lodash__down"
                        src="/assets/icons/arrow-up.png"
                        alt=""
                        width={10}
                      />
                    </button>
                  </div>
                </th>
                {playerTitle === "current" ? (
                  <th
                    scope="col"
                    className="text-center"
                    style={{ minWidth: 60 }}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center pe-pointer"
                      onClick={() => handleSortPlayer("ShirtNumber")}
                    >
                      <span className="me-1">No.</span>
                      <button
                        className="btn-lodash"
                        id="btn-lodash-ShirtNumber"
                      >
                        <img
                          className="btn-lodash__up"
                          src="/assets/icons/arrow-up.png"
                          alt=""
                          width={10}
                        />
                        <img
                          className="btn-lodash__down"
                          src="/assets/icons/arrow-up.png"
                          alt=""
                          width={10}
                        />
                      </button>
                    </div>
                  </th>
                ) : (
                  <>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ minWidth: 60 }}
                    >
                      <div
                        className="d-flex align-items-center justify-content-center pe-pointer"
                        onClick={() => handleSortPlayer("Goals")}
                      >
                        <span className="me-1">Goals</span>
                        <button className="btn-lodash" id="btn-lodash-Goals">
                          <img
                            className="btn-lodash__up"
                            src="/assets/icons/arrow-up.png"
                            alt=""
                            width={10}
                          />
                          <img
                            className="btn-lodash__down"
                            src="/assets/icons/arrow-up.png"
                            alt=""
                            width={10}
                          />
                        </button>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ minWidth: 60 }}
                    >
                      <div
                        className="d-flex align-items-center justify-content-center pe-pointer"
                        onClick={() => handleSortPlayer("Aperrances")}
                      >
                        <span className="me-1">Aperrances</span>
                        <button
                          className="btn-lodash"
                          id="btn-lodash-Aperrances"
                        >
                          <img
                            className="btn-lodash__up"
                            src="/assets/icons/arrow-up.png"
                            alt=""
                            width={10}
                          />
                          <img
                            className="btn-lodash__down"
                            src="/assets/icons/arrow-up.png"
                            alt=""
                            width={10}
                          />
                        </button>
                      </div>
                    </th>
                  </>
                )}
                <th scope="col" className="text-center">
                  <div
                    className="d-flex align-items-center justify-content-center pe-pointer"
                    onClick={() => handleSortPlayer("Position")}
                  >
                    <span className="me-1">Position</span>
                    <button className="btn-lodash" id="btn-lodash-Position">
                      <img
                        className="btn-lodash__up"
                        src="/assets/icons/arrow-up.png"
                        alt=""
                        width={10}
                      />
                      <img
                        className="btn-lodash__down"
                        src="/assets/icons/arrow-up.png"
                        alt=""
                        width={10}
                      />
                    </button>
                  </div>
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ minWidth: 100 }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center pe-pointer"
                    onClick={() => handleSortPlayer("Nation")}
                  >
                    <span className="me-1">Nation</span>
                    <button className="btn-lodash" id="btn-lodash-Nation">
                      <img
                        className="btn-lodash__up"
                        src="/assets/icons/arrow-up.png"
                        alt=""
                        width={10}
                      />
                      <img
                        className="btn-lodash__down"
                        src="/assets/icons/arrow-up.png"
                        alt=""
                        width={10}
                      />
                    </button>
                  </div>
                </th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {playerList.length > 0 ? (
                playerList.map((item, index) => {
                  return (
                    <tr key={item.Id}>
                      <th scope="row" className="align-middle">
                        {index + 1}
                      </th>
                      <td>
                        <div className="d-flex align-items-center">
                          <Image
                            src={item.Avatar}
                            className="img-avatar-player rounded"
                            loading="lazy"
                          />
                          <span className="ms-2 text-nowrap">{item.Name}</span>
                        </div>
                      </td>
                      {playerTitle === "current" ? (
                        <td className="text-center align-middle">
                          {item.ShirtNumber}
                        </td>
                      ) : (
                        <>
                          <td className="text-center align-middle">
                            {item.Goals}
                          </td>
                          <td className="text-center align-middle">
                            {item.Aperrances}
                          </td>
                        </>
                      )}
                      <td className="text-center align-middle">
                        {item.Position === "Goalkeeper" ? (
                          <span className="text-warning">Goalkeeper</span>
                        ) : item.Position === "Defender" ? (
                          <span className="text-primary">Defender</span>
                        ) : item.Position === "Midfielder" ? (
                          <span className="text-success">Midfielder</span>
                        ) : (
                          <span className="text-danger">Forward</span>
                        )}
                      </td>
                      <td className="text-center align-middle">
                        {item.Nation}
                      </td>
                      <td className="text-center align-middle">
                        <div className="d-flex flex-nowrap justify-content-center mx-3">
                          <button
                            className="btn-action btn-editing mx-1 btn btn-primary"
                            onClick={() =>
                              dispatch(setUpdatePlayerFormData(item))
                            }
                          >
                            <img src="/assets/icons/editing.png" alt="" />
                          </button>
                          <button
                            className="btn-action btn-delete mx-1 btn btn-danger"
                            onClick={() => setPlayerDelete(item)}
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
        open={!!playerDelete}
        onCancel={() => setPlayerDelete(null)}
        okButtonProps={{ className: "bg-danger" }}
        onOk={handleDeletePlayer}
        title={
          <p className="mb-0 d-flex align-items-center">
            <WarningFilled className="text-danger fs-1" />
            <span className="ms-3">
              Do you want to delete player {playerDelete?.Name}?
            </span>
          </p>
        }
      ></Modal>
    </div>
  );
};

export default PlayersAdmin;
