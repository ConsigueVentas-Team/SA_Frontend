import PropTypes from 'prop-types';
import { useRef, useEffect, useState } from 'react';
import Avatar from "@mui/material/Avatar";
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const ListItem = ({ user }) => {

    const [showCardModal, setShowCardModal] = useState(false);

    const toggleShowModal = () => {
        setShowCardModal(!showCardModal)
    }

    const userBirthday = user.birthday.split('-');
    const year = userBirthday[0];
    const month = userBirthday[1] - 1;
    const day = userBirthday[2];

    const date = new Date(year, month, day);
    const formattedDate = date.toLocaleString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    return (
        <>
            <li className="p-2 py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <Avatar
                            alt={user.name}
                            src={user.image_url.replace("http://127.0.0.1:8000","https://backend.consigueventas.com")}
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                            {`${user.name} ${user.surname}`}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                            {user.email}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                            {formattedDate}
                        </p>
                    </div>
                    <button onClick={toggleShowModal} className="flex items-center justify-center gap-2 p-2 text-sm font-semibold duration-300 ease-in-out border rounded-md text-cv-cyan border-cv-secondary hover:bg-cv-secondary sm:text-base active:scale-95">
                        <VisibilityIcon />
                        <span className='hidden sm:block'>Ver más</span>
                    </button>
                </div>
            </li>
            {
                showCardModal && (
                    <CardModal userData={user} close={toggleShowModal} />
                )
            }
        </>
    )
}

ListItem.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        birthday: PropTypes.string.isRequired,
        image_url: PropTypes.string,
    }).isRequired,
};

export const CardModal = ({ userData, close }) => {
    const modalRef = useRef(null);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            close();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const transformDate = (dateString) => {
        const date = new Date(dateString);
        const timezoneOffset = date.getTimezoneOffset() * 60000;
        const adjustedDate = new Date(date.getTime() + timezoneOffset);
        const options = { day: 'numeric', month: 'long' };
        const formattedDate = adjustedDate.toLocaleDateString('es-ES', options);
        const currentYear = new Date().getFullYear();
        return `${formattedDate}, ${currentYear}`;
    };

    return (
        <div>
            <div className="fixed top-0 left-0 z-50 w-screen h-screen overflow-y-auto p-2.5 flex flex-col items-center justify-center bg-cv-secondary/50">
                <button type="button" onClick={close} className="absolute top-3 right-2.5 text-cv-primary bg-cv-cyan hover:bg-cv-cyan/80 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center">
                    <CloseIcon />
                    <span className="sr-only">Cerrar modal</span>
                </button>
                <div ref={modalRef} className="w-full max-w-md overflow-hidden text-white shadow-lg bg-cv-primary rounded-xl shadow-cv-cyan/40">
                    <div className="p-4 space-y-4">
                        <BirthdayImage item={userData} />
                        <div className="space-y-2">
                            <BirthdayItem name={'Cumpleaños'} item={transformDate(userData.birthday)} />
                            <BirthdayItem name={'Departamento'} item={userData.position[0].core.department.name} />
                            <BirthdayItem name={'Núcleo'} item={userData.position[0].core.name} />
                            <BirthdayItem name={'Perfil'} item={userData.position[0].name} />
                            <BirthdayItem name={'Turno'} item={userData.shift} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

CardModal.propTypes = {
    userData: PropTypes.array.isRequired,
    close: PropTypes.func.isRequired,
}

export const BirthdayImage = ({ item }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <img src={item.image_url.replace("http://127.0.0.1:8000","https://backend.consigueventas.com")} alt={item.name} className="w-40 h-40 rounded-full shadow-lg ring-2 ring-cv-cyan" />
            <div>
                <p className="text-xl text-center text-white font-nomal md:text-2xl">{`${item.name} ${item.surname}`}</p>
                <p className="text-sm font-light text-center text-white truncate">{item.email}</p>
            </div>
        </div>
    )
}
BirthdayImage.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        image_url: PropTypes.string.isRequired,
    }).isRequired,
};

export const BirthdayItem = ({ name, item }) => {
    return (
        <div className="flex items-center gap-1 sm:gap-5">
            <p className="w-full text-lg font-semibold text-start">{name}:</p>
            <p className="w-full text-base font-light text-start">{item}</p>
        </div>
    )
}
BirthdayItem.propTypes = {
    name: PropTypes.string.isRequired,
    item: PropTypes.string.isRequired,
}


export const ButtonNavigation = ({ onClick, children }) => {
    return (
        <span onClick={onClick} className='flex items-center justify-center p-1 text-white duration-300 ease-in-out rounded-full hover:bg-cv-secondary active:scale-95'>
            {children}
        </span>
    )
}
ButtonNavigation.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}


export const NotFound = () => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                viewBox="0 0 200 200"
                className='fill-slate-500'
            >
                <path
                    d="M68.266 3.656a5.492 5.492 0 100 10.985 5.492 5.492 0 000-10.985zm.191 2.242h.047-.047zm-.707.04c-.05.007-.102.019-.152.03.05-.011.101-.023.152-.03zm-.512.128zm2.2.043zm-2.688.168zm3.07.008l.043.024-.043-.024zm.16.094l.06.039c-.02-.012-.04-.027-.06-.04zm-3.726.223l-.086.062.086-.062zm4.219.152zm.14.137c.016.015.028.03.043.046l-.043-.046zm-4.816.144c-.024.031-.05.067-.074.102.023-.035.05-.07.074-.102zm5.195.332l.035.059-.035-.059zm-5.5.094l-.086.156.086-.156zm5.606.086l.023.043-.023-.043zm.183.375zm-6.02.016zm93.278.082c-.39.066-.719.328-.867.695l-1.324 3.262a.65.65 0 01-.36.359l-3.066 1.242a1.222 1.222 0 00.012 2.262l3.058 1.215a.656.656 0 01.363.36l1.305 3.19a1.156 1.156 0 002.137.004l1.234-2.972c.16-.387.485-.68.883-.797a16.28 16.28 0 002.465-.965c1.402-.668 1.168-1.906-.191-2.445a56.43 56.43 0 01-2.774-1.164.646.646 0 01-.344-.36l-1.277-3.187a1.149 1.149 0 00-1.254-.7zm-93.437.445l-.036.152.036-.152zm6.406.437a.19.19 0 01.004.047c0-.015 0-.031-.004-.047zm-6.442.758c.012.05.02.102.036.152-.016-.05-.024-.101-.036-.152zm6.407 0l-.035.152.035-.152zm-6.278.512zm6.149 0c-.02.055-.043.113-.067.172.024-.059.047-.117.067-.172zm-5.938.488c.028.05.055.106.086.156-.031-.05-.058-.105-.086-.156zm5.727 0zm-.313.48c-.027.036-.05.07-.078.106.028-.035.051-.07.078-.105zm-5.09.016c.02.028.043.055.067.086-.024-.031-.047-.058-.067-.086zm4.645.457c-.035.024-.066.051-.102.075.036-.024.067-.051.102-.075zm-4.207 0c.027.024.059.043.086.067-.027-.024-.059-.043-.086-.067zm.422.305c.055.027.105.059.16.082-.055-.023-.105-.055-.16-.082zm3.355 0l-.152.082.152-.082zm-2.879.23c.059.024.114.047.172.067-.058-.02-.113-.043-.172-.067zm2.407 0c-.059.024-.118.047-.176.067.058-.02.117-.043.176-.067zm-.528.16l-.156.036.156-.035zm-1.347 0l.152.036-.152-.035zM56.922 21.52c-1.36-.06-2.766.914-2.754 2.789.012 1.984.004 4.003-.023 6.058-.004.176-.094.266-.274.266-4.473 0-9.988-.41-13.816.625-5.856 1.578-10.715 6.297-12.383 12.097-.492 1.696-.738 4.711-.742 9.047-.004 19.5 0 39 .004 58.496-.012 14.668-.008 29.329.011 43.985.004 3.351.235 5.812.692 7.383 1.718 5.879 6.574 10.617 12.465 12.18 3.75.992 9.105.577 13.46.574 33.481.007 66.961.027 100.422-.008 3.012-.004 5.254-.219 6.727-.645 5.762-1.66 10.496-6.355 12.144-12.078.465-1.61.7-4.223.704-7.84.004-21.75.004-43.492 0-65.219.004-13.105.004-26.199-.004-39.285-.004-2.644-.211-4.715-.625-6.21-1.684-6.008-6.211-10.626-12.266-12.41-3.914-1.157-8.734-.7-12.785-.68l-1.293-.016c-.16-.004-.238-.082-.234-.246.027-1.703.41-6.61-.543-7.867-1.258-1.66-4.375-1.078-4.66 1.05-.215 1.602-.223 3.88-.02 6.832.012.157-.063.235-.223.235h-16.023c-.156 0-.235-.078-.238-.235 0-1.824.457-6.441-.54-7.867-.953-1.363-3.582-1.32-4.425.266-.75 1.418-.34 5.844-.34 7.601 0 .157-.082.235-.242.235H103.19c-.168 0-.246-.082-.246-.25.035-1.785.434-6.418-.597-7.82-1.215-1.657-4.547-1.141-4.684 1a56.749 56.749 0 00-.031 6.718.353.353 0 01-.09.25.336.336 0 01-.246.102H81.39c-.157 0-.235-.078-.235-.235-.011-1.761.426-6.332-.469-7.718-1.253-1.946-4.812-1.13-4.828 1.148a616.15 616.15 0 00-.011 6.567.24.24 0 01-.243.238H59.703c-.156 0-.234-.074-.234-.23-.016-1.942.418-6.145-.465-7.65-.469-.8-1.266-1.202-2.082-1.233zm-16.098 1.105c-1.011 0-1.832.82-1.832 1.832a1.833 1.833 0 103.668 0 1.835 1.835 0 00-1.836-1.832zm-12.484.004a1.837 1.837 0 100 3.676 1.837 1.837 0 100-3.676zm-6.258.004a1.837 1.837 0 00-1.836 1.84 1.837 1.837 0 103.676 0 1.84 1.84 0 00-1.84-1.84zm12.5.004c-1.012 0-1.828.82-1.828 1.832a1.828 1.828 0 103.656 0 1.829 1.829 0 00-1.828-1.832zM146.91 31a1.019 1.019 0 000 0zm-5.289 2.793c-.02.418-.074.809-.172 1.168-.097.36-.234.684-.414.98-.008 2.98-.012 5.965-.008 8.954.004 3.562 5.055 3.937 5.278.55.199-3.09.226-6.18.074-9.27-.008-.16.066-.241.226-.241 4.055.02 9.114-.434 12.606.609 4.457 1.324 7.32 4.293 8.59 8.895.726 2.64.441 6.046.46 8.996 0 .164-.085.246-.25.246l-33.823.004H32.504c-.188 0-.281-.094-.277-.278.011-.949.02-2.703.023-5.265.008-7.239 4.836-12.602 12.035-13.172 1.297-.106 4.5-.102 9.61.015.164.008.246.094.246.258.03 2.176-.532 9.008.53 10.555 1.364 1.988 4.731.93 4.759-1.817.027-2.93.039-5.863.03-8.8 0-.16.083-.242.243-.242h15.899c.152 0 .23.078.23.23.02 2.96.035 5.906.047 8.836.016 2.844 3.621 3.851 4.894 1.492.922-1.71.364-8.016.395-10.242.004-.211.113-.316.32-.316h15.82c.208 0 .31.105.301.312-.07 2.14-.597 8.96.504 10.504 1.07 1.484 3.719 1.328 4.485-.29.91-1.925.359-7.929.359-10.284 0-.16.078-.242.238-.242H119c.207 0 .313.105.316.312.055 3.078.055 6.113.004 9.113-.05 2.98 5.32 3.782 5.32-.883 0-2.761 0-5.527.008-8.292 0-.165.082-.247.247-.247h16.14c.18-.296.317-.62.414-.98.098-.36.153-.75.172-1.168zM11.234 48.003c-.554.024-1.113.474-1.457 1.294-.382.93-.757 1.887-1.125 2.871a.61.61 0 01-.293.332c-1 .527-2.039.973-3.113 1.336-1.215.414-2.02 1.96-.492 2.605 1.184.5 2.367 1.012 3.547 1.532a.543.543 0 01.32.328l1.402 3.508c.196.484.665.8 1.184.804.523 0 .992-.312 1.191-.797l1.485-3.644a.483.483 0 01.262-.258l3.597-1.434a1.295 1.295 0 00.004-2.402l-3.512-1.422a.586.586 0 01-.308-.281 33.528 33.528 0 01-1.297-3.125c-.3-.871-.844-1.27-1.395-1.246zm123.485 7.75a.294.294 0 000 0zm-.36 3.696a.318.318 0 000 0zm-5.707.524l39.32.125c.169 0 .25.082.25.25l.024 28.754c.008 21.875.012 43.757.008 65.64 0 2.781-.184 4.793-.559 6.035-1.66 5.5-6.582 8.926-12.289 8.926-33.746.008-67.5.016-101.254.02-4.109-.004-9.578.527-13.187-.645-5.762-1.867-8.715-6.851-8.715-12.797-.008-16.183-.012-32.37-.016-48.566l.008-47.469c0-.168.086-.254.258-.254zm60.504 8.672a3.617 3.617 0 100 7.233 3.617 3.617 0 000-7.233zm-90.543 2.578c-12.933.386-25.761 6.515-34.328 18.925-5.75 8.329-8.277 17.758-7.57 28.282 1.547 18.578 14.715 34.203 32.793 38.808 35.097 8.942 65.441-26.683 50.652-60.164-8.125-17.347-24.922-26.347-41.547-25.851zm.766 5.406c14.125-.324 28.351 7.05 35.535 21.906a1.434 1.434 0 000 0c8.57 18.473 1.527 40.04-16.23 49.922-23.82 13.254-52.762-2.273-56.47-28.68-.984-8.925.661-16.98 4.934-24.164 7.387-12.422 19.766-18.703 32.23-18.984zm69.176 11.918c.054-.012.12.02.195.094-.074-.075-.14-.106-.195-.094zm0 0c-.055.012-.106.062-.145.16.04-.098.09-.148.145-.16zm23.593.45a7.849 7.849 0 00-7.847 7.85 7.849 7.849 0 007.847 7.852 7.852 7.852 0 000-15.703zm-.007 3.179a4.676 4.676 0 014.675 4.676 4.677 4.677 0 01-4.675 4.68 4.677 4.677 0 01-4.676-4.68 4.676 4.676 0 014.676-4.676zM88.883 98.613c-1.91.063-1.883 2.282-3.25 3.196-1.352.91-2.414.054-3-1.278-.875-1.976-3.278-2.613-4.656-.918-1.637 2.012.48 5.153 2.199 6.371 7.804 5.532 15.316-5.855 9.656-7.254a3.543 3.543 0 00-.95-.117zm22.449.028a2.625 2.625 0 00-2.266 1.257c-1.203 1.961.82 4.91 2.446 6.106 4.367 3.191 9.883 1.004 11.57-3.973 1.023-3.015-3.668-4.957-5.172-1.55-.316.71-.637 1.16-.96 1.347-2.49 1.438-2.805-1.8-4.067-2.687a2.711 2.711 0 00-1.551-.5zm-79.39 12.492zm-1.641.695zm-23.215 3.098A7.085 7.085 0 000 122.012a7.085 7.085 0 007.086 7.086 7.085 7.085 0 007.086-7.086 7.085 7.085 0 00-7.086-7.086zm93.23.32c-10.168-.125-20.296 5.813-23.824 17.82-.77 2.618 1.754 4.88 3.969 3.293.96-.695 1.246-2.058 1.664-3.168 6.563-17.449 30.84-16.46 36.652.98.34 1.02.684 1.7 1.035 2.04 1.286 1.262 4.004.45 4.34-1.297.176-.875.004-1.969-.507-3.285-4.188-10.805-13.774-16.266-23.329-16.383zm-93.238 2.55a4.219 4.219 0 110 8.438 4.22 4.22 0 110-8.437zm49.828.516c.067.079.13.278.196.594-.067-.316-.13-.515-.196-.594zm127.61 8.055a1.845 1.845 0 101.844 1.844 1.845 1.845 0 00-1.844-1.844zm0 6.242a1.837 1.837 0 00-1.836 1.84 1.837 1.837 0 103.675 0 1.84 1.84 0 00-1.84-1.84zm.004 6.262a1.824 1.824 0 100 3.648 1.824 1.824 0 100-3.648zm-171.348 3.184a3.625 3.625 0 100 7.25 3.625 3.625 0 000-7.25zm171.344 3.05a1.828 1.828 0 100 3.656 1.823 1.823 0 001.828-1.827 1.823 1.823 0 00-1.828-1.829zM56.352 171.438c-.051.25-.075.492-.067.726a2.633 2.633 0 00.399 1.305 2.642 2.642 0 01-.399-1.305 3.126 3.126 0 01.067-.726zm-34.856 3.792a.857.857 0 00-.695.543l-.93 2.446a.513.513 0 01-.254.281c-.96.457-3.504.887-3.008 2.398a.399.399 0 00.22.239l2.753 1.21c.113.051.203.145.254.262l1.012 2.512a.882.882 0 001.629.012l1.054-2.555a.584.584 0 01.317-.316c.77-.317 3.418-.871 2.828-2.282a.657.657 0 00-.293-.332c-.942-.53-2.711-.703-3.078-1.914-.25-.82-.586-1.535-1.008-2.144a.843.843 0 00-.8-.36zm151.117 2.618c-.62-.028-1.258.511-1.601 1.433a25.681 25.681 0 01-1.442 3.23.55.55 0 01-.289.259l-3.726 1.53a1.33 1.33 0 00-.825 1.235c0 .54.329 1.028.829 1.23l3.843 1.56a.567.567 0 01.301.3l1.594 3.898a1.29 1.29 0 002.39 0l1.547-3.8a.55.55 0 01.262-.286c1.09-.539 2.203-1.019 3.34-1.44 1.773-.673 1.766-2.243-.04-2.93a44.73 44.73 0 01-3.233-1.387.663.663 0 01-.32-.34c-.458-1.094-.911-2.2-1.352-3.309-.32-.793-.793-1.16-1.278-1.183zm-39.636 1.847a3.62 3.62 0 100 7.243 3.62 3.62 0 003.617-3.622c0-2-1.621-3.62-3.617-3.62zm-72.594 2.59a1.85 1.85 0 00-1.852 1.848 1.85 1.85 0 003.7 0c0-1.02-.829-1.848-1.848-1.848zm12.488.016a1.842 1.842 0 100 3.684 1.842 1.842 0 100-3.684zm-18.73.004c-1.02 0-1.844.824-1.844 1.843 0 1.016.824 1.844 1.844 1.844a1.846 1.846 0 001.84-1.844c0-1.02-.825-1.843-1.84-1.843zm12.496 0a1.828 1.828 0 100 3.656 1.829 1.829 0 100-3.656zm49.543 1.957a1.057 1.057 0 00-.805.644l-1.16 2.864a.58.58 0 01-.29.304c-1.12.543-4.062 1.074-3.468 2.84a.23.23 0 00.129.14l3.328 1.497c.145.062.258.18.316.328l1.141 2.816a1.038 1.038 0 001.918.012l1.227-2.883a.653.653 0 01.351-.355l2.805-1.156a1.074 1.074 0 00.012-1.988l-2.895-1.216a.543.543 0 01-.285-.289l-1.164-2.91a1.06 1.06 0 00-1.16-.648zm0 0"
                ></path>
            </svg>
        </>
    )
}


