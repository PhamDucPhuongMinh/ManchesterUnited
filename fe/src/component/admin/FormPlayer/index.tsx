import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "./index.scss";
import { handleShowMessage } from "../../commons/Message";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/slices/loadingSlice";
import {
  setShowCreatePlayerForm,
  setUpdatePlayerFormData,
} from "../../../redux/slices/adminSlice";
import { createPlayerAPI, updatePlayerAPI } from "../../../services";
import { getUpdatePlayerFormDataSelector } from "../../../redux/selectors";
import { convertUnixTimeToDate, regexImageLink } from "../../../utils";

interface FormValuesType {
  Avatar: string;
  DoB: any;
  DoJoining: any;
  DoDebuting: any;
  DebutMatch: string | null;
  Name: string;
  Nation: string;
  Position: string;
  ShirtNumber: number | null;
  Goals: number | null;
  CleanSheets: number | null;
  Aperrances: number | null;
}

interface Props {
  onSuccess: () => void;
}

const PlayerForm: React.FC<Props> = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const [avatarInputValue, setAvatarInputValue] = useState<string>("");
  const updatePlayerFormData = useSelector(getUpdatePlayerFormDataSelector);

  const handleCreatePlayer = async (values: FormValuesType) => {
    dispatch(setLoading(true));
    console.log(values);
    try {
      const dataApi = {
        Avatar: values.Avatar,
        DoB: values.DoB.unix(),
        DoJoining: values.DoJoining.unix(),
        DoDebuting: values.DoDebuting ? values.DoDebuting.unix() : null,
        DebutMatch: values.DebutMatch,
        Name: values.Name,
        Nation: values.Nation,
        Position: values.Position,
        ShirtNumber: values.ShirtNumber,
        Goals: values.Goals,
        CleanSheets: values.CleanSheets,
        Aperrances: values.Aperrances,
      };
      const resultCreatePlayerApi = await createPlayerAPI(dataApi);
      if (resultCreatePlayerApi.data.result) {
        handleShowMessage(
          "success",
          resultCreatePlayerApi.data.msg || "Create successful player!"
        );
        onSuccess();
        dispatch(setShowCreatePlayerForm(false));
      } else {
        handleShowMessage(
          "error",
          resultCreatePlayerApi.data.msg ||
            "Create failed player. Please try again."
        );
      }
    } catch (error) {
      console.log(error);
      handleShowMessage("error", "System error. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleUpdatePlayer = async (values: FormValuesType) => {
    if (updatePlayerFormData) {
      dispatch(setLoading(true));
      try {
        const dataApi = {
          Id: updatePlayerFormData.Id,
          Avatar: values.Avatar,
          DoB: values.DoB.unix(),
          DoJoining: values.DoJoining.unix(),
          DoDebuting: values.DoDebuting ? values.DoDebuting.unix() : null,
          DebutMatch: values.DebutMatch,
          Name: values.Name,
          Nation: values.Nation,
          Position: values.Position,
          ShirtNumber: values.ShirtNumber,
          Goals: values.Goals,
          CleanSheets: values.CleanSheets,
          Aperrances: values.Aperrances,
        };
        const resultUpdatePlayerApi = await updatePlayerAPI(dataApi);
        if (resultUpdatePlayerApi.data.result) {
          handleShowMessage(
            "success",
            resultUpdatePlayerApi.data.msg || "Successfully updated player!"
          );
          onSuccess();
          dispatch(setUpdatePlayerFormData(null));
        } else {
          handleShowMessage(
            "error",
            resultUpdatePlayerApi.data.msg ||
              "Update failed player. Please try again."
          );
        }
      } catch (error) {
        console.log(error);
        handleShowMessage("error", "System error. Please try again.");
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  const handleSubmit = async (values: FormValuesType) => {
    if (updatePlayerFormData) {
      handleUpdatePlayer(values);
    } else {
      handleCreatePlayer(values);
    }
  };

  useEffect(() => {
    if (updatePlayerFormData) {
      setAvatarInputValue(updatePlayerFormData.Avatar);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="create-player-form">
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 600 }}
        onFinish={handleSubmit}
        autoComplete="off"
        layout="vertical"
        className="mx-auto"
        initialValues={
          updatePlayerFormData
            ? {
                ...updatePlayerFormData,
                DoB: dayjs(
                  convertUnixTimeToDate(updatePlayerFormData.DoB),
                  "DD-MM-YYYY"
                ),
                DoJoining: dayjs(
                  convertUnixTimeToDate(updatePlayerFormData.DoJoining),
                  "DD-MM-YYYY"
                ),
                DoDebuting: updatePlayerFormData.DoDebuting
                  ? dayjs(
                      convertUnixTimeToDate(updatePlayerFormData.DoDebuting),
                      "DD-MM-YYYY"
                    )
                  : "",
              }
            : { Position: "Forward", ShirtNumber: null }
        }
      >
        <Form.Item
          wrapperCol={{ span: 24 }}
          label="Name"
          name="Name"
          rules={[{ required: true, message: "Please enter player's name!" }]}
        >
          <Input placeholder="Robin Van Persie" />
        </Form.Item>

        <Form.Item
          label="Position"
          name="Position"
          rules={[
            { required: true, message: "Please enter player's position!" },
          ]}
        >
          <Select>
            <Select.Option value="Forward">Forward</Select.Option>
            <Select.Option value="Midfielder">Midfielder</Select.Option>
            <Select.Option value="Defender">Defender</Select.Option>
            <Select.Option value="Goalkeeper">Goalkeeper</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 24 }}
          label="Shirt number (for First team's player)"
          name="ShirtNumber"
        >
          <InputNumber placeholder="10" min={1} max={99} />
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 24 }}
          label="Nation"
          name="Nation"
          rules={[{ required: true, message: "Please enter player's nation!" }]}
        >
          <Input placeholder="Netherlands" />
        </Form.Item>

        <Form.Item
          label="Date of birth"
          name="DoB"
          rules={[
            {
              required: true,
              message: "Please enter player's DoB!",
            },
          ]}
        >
          <DatePicker format="DD-MM-YYYY" />
        </Form.Item>

        <Form.Item
          label="Joining date"
          name="DoJoining"
          rules={[
            {
              required: true,
              message: "Please enter player's joining date!",
            },
          ]}
        >
          <DatePicker format="DD-MM-YYYY" />
        </Form.Item>

        <Form.Item label="Debut date" name="DoDebuting">
          <DatePicker format="DD-MM-YYYY" />
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 24 }}
          label="Debut match"
          name="DebutMatch"
        >
          <Input placeholder="vs Manchester City (H)" />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }} label="Goals" name="Goals">
          <InputNumber placeholder="10" min={0} />
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 24 }}
          label="Clean sheets (for Goalkeeper)"
          name="CleanSheets"
        >
          <InputNumber placeholder="10" min={0} />
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 24 }}
          label="Aperrances"
          name="Aperrances"
        >
          <InputNumber placeholder="10" min={1} />
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 24 }}
          label="Avatar"
          name="Avatar"
          className="mb-4"
          rules={[
            {
              required: true,
              message: "Please enter player's avatar!",
            },
            {
              pattern: regexImageLink,
              message: "Please enter url image!",
            },
          ]}
        >
          <Input
            placeholder="https://media/vanpersie.png"
            onBlur={(e) => setAvatarInputValue(e.target.value)}
          />
        </Form.Item>
        {regexImageLink.test(avatarInputValue) ? (
          <img
            src={avatarInputValue}
            className="create-player-form__avatar-player rounded mb-4"
            alt="invalid avatar"
          />
        ) : (
          <div className="create-player-form__thumbnail-avatar rounded mb-4">
            <img src="/assets/icons/focus.png" alt="" width={80} height={80} />
          </div>
        )}

        <Form.Item wrapperCol={{ span: 24 }} className="mb-0">
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            block
            className="mt-2"
          >
            {updatePlayerFormData ? "Update player" : "Create player"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PlayerForm;
