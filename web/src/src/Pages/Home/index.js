import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { save, remove, toggle, load } from "../../store/modules/app/actions";

const Home = () => {
	const dispatch = useDispatch();
	const [task, setTask] = useState("");

	const { tasks, loading } = useSelector((state) => state.app);

	useEffect(() => {
		dispatch(load());
	}, []);

	const addTask = () => {
		dispatch(
			save({
				id: new Date().getTime(),
				title: task,
				completed: false,
			})
		);
	};

	const removeTask = (taskId) => {
		dispatch(remove(taskId));
	};

	const toggleTask = (taskId) => {
		dispatch(toggle(taskId));
	};

	return (
		<>
			{loading && (
				<h1
					style={{
						color: "#fff",
						textAlign: "center",
						paddingTop: "300px",
					}}
				>
					Carregando...
				</h1>
			)}
			{!loading && (
				<div style={{ padding: "100px" }}>
					<div
						style={{ padding: "40px", background: "#fff" }}
						class="container"
					>
						<h1
							style={{
								textAlign: "center",
								paddingBottom: "30px",
							}}
						>
							Preencha suas atividades
						</h1>
						<hr />
						<div class="container">
							<div class="row">
								<div class="col-sm">
									<div
										class="alert alert-success"
										role="alert"
									>
										Você tem um total de{" "}
										<b>
											{
												tasks?.filter(
													(task) => task?.completed
												).length
											}
										</b>{" "}
										atividades completas.
									</div>
								</div>
								<div class="col-sm">
									<div
										class="alert alert-danger"
										role="alert"
									>
										Você tem um total de{" "}
										<b>
											{
												tasks?.filter(
													(task) => !task?.completed
												).length
											}
										</b>{" "}
										atividades pendentes.
									</div>
								</div>
							</div>
						</div>
						<br />
						<br />
						<div class="row">
							<div class="col-10">
								<input
									value={task}
									type="text"
									class="form-control"
									placeholder="Descreva sua atividade aqui..."
									onChange={(e) => setTask(e.target.value)}
								/>
							</div>

							<div class="col-2">
								<button
									style={{ float: "right" }}
									class="btn btn-primary mb-2"
									onClick={addTask}
								>
									Adicionar
								</button>
							</div>
						</div>

						<hr />
						<br />
						<table class="table table-hover">
							<tbody>
								{tasks?.map((task) => (
									<tr
										style={{
											background: task?.completed
												? "#d1e7dd"
												: "#f8d7da",
										}}
									>
										<td style={{ padding: "15px" }}>
											<input
												checked={task?.completed}
												class="form-check-input"
												type="checkbox"
												onClick={() =>
													toggleTask(task?.id)
												}
											/>{" "}
											{task?.title}
										</td>

										<td style={{ width: "100px" }}>
											<button
												type="button"
												class="btn btn-danger"
												onClick={() =>
													removeTask(task?.id)
												}
											>
												Remover
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<br />
					</div>
				</div>
			)}
		</>
	);
};

export default Home;
