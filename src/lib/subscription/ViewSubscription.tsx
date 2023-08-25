import { Modal } from "antd";
import router from "next/router";
import { BsClock } from "react-icons/bs";
import { Button, Tooltip } from "@nextui-org/react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BuildCategory } from "@/utils/buildCategory";
import { EyeIcon } from "../icon";
import { useState } from "react";
function ViewSubscriptionModal({
  visible,
  setVisible,
  data,
}: {
  visible: boolean;
  setVisible: Function;
  data: any;
}) {
  const handleOk = () => {
    router.push(`${router.pathname}?subscription=false`, `/subscription`);
    setVisible(false);
  };

  const handleCancel = () => {
    router.push(`${router.pathname}?subscription=false`, `/subscription`);
    setVisible(false);
  };
  if (!data) return <div></div>;
  return (
    <Modal
      title="View Subscription"
      footer={[]}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-1">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-x-3 items-center">
              <div>
                <b>Name:</b> {data.name}
              </div>

              <div className="flex flex-row gap-x-2 items-center">
                <BuildCategory categoryID={data.category} full={false} />
              </div>
            </div>
            <div className="flex flex-row gap-x-4 items-center">
              <Button
                isIconOnly
                radius="full"
                size="sm"
                className={`relative left-1.5 ${
                  data.transaction_is_spending ? "bg-red-200" : "bg-green-200"
                }`}
              >
                {data.transaction_is_spending ? (
                  <AiOutlineMinus />
                ) : (
                  <AiOutlinePlus />
                )}
              </Button>{" "}
              ${data.amount}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <b>Description:</b>
            {data.description && (
              <div className="border-1 border-gray-300 rounded-lg p-4">
                {data.description}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row-reverse">
          <div className="flex flex-row gap-x-2 items-center">
            <BsClock /> {data.date}/{data.last_month}/{data.last_year}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export function ViewSubscription({ data }: { data: any }) {
  const [viewVisible, setViewVisble] = useState(false);
  function handleView(data: any) {
    router.push(
      `${router.pathname}?subscription=true`,
      `/subscription/${data._id}`
    );
    setViewVisble(true);
  }
  return (
    <div>
      <Tooltip content="Details">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <EyeIcon onClick={() => handleView(data)} />
        </span>
      </Tooltip>
      <ViewSubscriptionModal
        visible={viewVisible}
        setVisible={setViewVisble}
        data={data}
      />
    </div>
  );
}
