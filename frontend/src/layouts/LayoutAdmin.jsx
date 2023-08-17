import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "../components"
import { useEffect, useState } from "react";

export const LayoutAdmin = () => {
	const [currentPage, setCurrentPage] = useState("");

	useEffect(() => {
		const storedPage = localStorage.getItem("currentPage");
		if (storedPage) {
			setCurrentPage(storedPage);
		}
	}, []);

	const handlePageClick = (pageName) => {
		setCurrentPage(pageName);
		localStorage.setItem("currentPage", pageName);
	};

	return (
		<div className="min-h-screen grid grid-cols-1 xl:grid-cols-6">
			<Sidebar onPageClick={handlePageClick} />
			<div className="xl:col-span-5">
				<Header currentPage={currentPage} onPageClick={handlePageClick} />
				<div className="h-[90vh] overflow-y-auto p-2.5 sm:p-5 bg-cv-secondary text-white ">
					<Outlet />
				</div>
			</div>
		</div>
	)
}
