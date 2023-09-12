import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUpdateTrophyFormDataSelector } from "../../../redux/selectors";
import "./index.scss";
import { regexImageLink } from "../../../utils";
import { createTrophyAPI, updateTrophyAPI } from "../../../services";
import { handleShowMessage } from "../../commons/Message";
import { setLoading } from "../../../redux/slices/loadingSlice";
import { setUpdateTrophyFormData } from "../../../redux/slices/adminSlice";

interface FormValuesType {
  Name: string;
  TrophyImage: string;
  Summary: string;
  Description: string;
  WinnerTeamImage: string;
}

interface Props {
  onSuccess: () => void;
}

const CreateTrophyForm: React.FC<Props> = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const updateTrophyFormData = useSelector(getUpdateTrophyFormDataSelector);
  const [trophyImage, setTrophyImage] = useState("");
  const [winnerTeamImage, setWinnerTeamImage] = useState("");

  const handleCreateTrophy = async (values: FormValuesType) => {
    dispatch(setLoading(true));
    try {
      const resultCreateTrophyApi = await createTrophyAPI(values);
      if (resultCreateTrophyApi.data.result) {
        handleShowMessage(
          "success",
          resultCreateTrophyApi.data.msg || "Create successful trophy."
        );
        onSuccess();
      } else {
        handleShowMessage(
          "error",
          resultCreateTrophyApi.data.msg ||
            "Create failed trophy. Please try again."
        );
      }
    } catch (error) {
      console.log(error);
      handleShowMessage("error", "System error. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleUpdateTrophy = async (values: FormValuesType) => {
    dispatch(setLoading(true));
    try {
      if (updateTrophyFormData) {
        const dataApi = { Id: updateTrophyFormData.Id, ...values };
        const resultUpdateTrophyApi = await updateTrophyAPI(dataApi);
        if (resultUpdateTrophyApi.data.result) {
          handleShowMessage(
            "success",
            resultUpdateTrophyApi.data.msg || "Successfully updated trophy!"
          );
          onSuccess();
          dispatch(setUpdateTrophyFormData(null));
        } else {
          handleShowMessage(
            "error",
            resultUpdateTrophyApi.data.msg ||
              "Update failed trophy. Please try again."
          );
        }
      }
    } catch (error) {
      console.log(error);
      handleShowMessage("error", "System error. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSubmit = async (values: FormValuesType) => {
    if (updateTrophyFormData) {
      handleUpdateTrophy(values);
    } else {
      handleCreateTrophy(values);
    }
  };

  useEffect(() => {
    if (updateTrophyFormData) {
      setTrophyImage(updateTrophyFormData.TrophyImage);
      setWinnerTeamImage(updateTrophyFormData.WinnerTeamImage);
    }
  }, [updateTrophyFormData]);

  return (
    <div className="create-trophy-form">
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 600 }}
        onFinish={handleSubmit}
        autoComplete="off"
        layout="vertical"
        className="mx-auto"
        initialValues={updateTrophyFormData || undefined}
      >
        <Form.Item
          wrapperCol={{ span: 24 }}
          label="Trophy's name"
          name="Name"
          rules={[{ required: true, message: "Please enter trophy's name!" }]}
        >
          <Input placeholder="English Premier League" />
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 24 }}
          label="Trophy image"
          name="TrophyImage"
          className="mb-4"
          rules={[
            {
              required: true,
              message: "Please enter trophy image!",
            },
            {
              pattern: regexImageLink,
              message: "Please enter url image!",
            },
          ]}
        >
          <Input
            placeholder="https://media/FA_Cup.png"
            onBlur={(e) => setTrophyImage(e.target.value)}
          />
        </Form.Item>
        {regexImageLink.test(trophyImage) ? (
          <img
            src={trophyImage}
            className="create-trophy-form__image rounded mb-4"
            alt="invalid avatar"
          />
        ) : (
          <div className="create-trophy-form__thumbnail rounded mb-4">
            <img
              src="/assets/icons/image-processing.png"
              alt=""
              width={80}
              height={80}
            />
          </div>
        )}
        <Form.Item
          wrapperCol={{ span: 24 }}
          label="Summary"
          name="Summary"
          rules={[
            { required: true, message: "Please enter trophy's summary!" },
          ]}
        >
          <Input.TextArea placeholder="Trophy's summary" rows={4} />
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 24 }}
          label="Description"
          name="Description"
          rules={[
            { required: true, message: "Please enter trophy's description!" },
          ]}
        >
          <Input.TextArea placeholder="Trophy's description" rows={10} />
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 24 }}
          label="Winner team image"
          name="WinnerTeamImage"
          className="mb-4"
          rules={[
            {
              required: true,
              message: "Please enter winner team image!",
            },
            {
              pattern: regexImageLink,
              message: "Please enter url image!",
            },
          ]}
        >
          <Input
            placeholder="https://media/ManUnited-Team-2013.png"
            onBlur={(e) => setWinnerTeamImage(e.target.value)}
          />
        </Form.Item>
        {regexImageLink.test(winnerTeamImage) ? (
          <img
            src={winnerTeamImage}
            className="create-trophy-form__image create-trophy-form__image--winner-team rounded mb-4"
            alt="invalid avatar"
          />
        ) : (
          <div className="create-trophy-form__thumbnail rounded mb-4">
            <img
              src="/assets/icons/image-processing.png"
              alt=""
              width={80}
              height={80}
            />
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
            {updateTrophyFormData ? "Update trophy" : "Create trophy"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateTrophyForm;
