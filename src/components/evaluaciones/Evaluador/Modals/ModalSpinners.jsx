import Loading from "../../../essentials/Loading";
export const ModalSpinners = ({isOpen}) => {
  return (
    <div
            className={`fixed top-0 left-0 w-full h-full text-black flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? "block" : "hidden"
                }`}
            // onClick={onClose}
        >
                <Loading />
            
        </div>
  )
}
