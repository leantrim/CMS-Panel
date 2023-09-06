import Modal from "@/components/common/Modal";
import { WebsiteModel } from "types/WebsiteModel";
import { useState } from "react";
import SharedButton from "@/Shared/SharedButton";

type Props = {
  site: WebsiteModel;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (value: boolean) => void;
};

const DeleteSite = (props: Props) => {
  const { isDeleteModalOpen, site, setIsDeleteModalOpen } = props;

  return (
    <Modal
      isOpen={isDeleteModalOpen}
      onClose={() => setIsDeleteModalOpen(false)}
    >
      <div>Are you sure you want to delete????</div>
    </Modal>
  );
};

export default DeleteSite;
