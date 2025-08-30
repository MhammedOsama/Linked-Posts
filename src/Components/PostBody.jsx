import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

function PostBody({ image, body }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {body && <p className='mb-3'>{body}</p>}
      {image && (
        <img
          onClick={onOpen}
          src={image}
          className='w-full h-75 object-cover cursor-pointer'
          alt=''
        />
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <img src={image} className='w-full h-auto object-contain' alt='' />
        </ModalContent>
      </Modal>
    </>
  );
}

export default PostBody;
