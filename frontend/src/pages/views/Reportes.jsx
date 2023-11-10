import { useState, useEffect } from 'react'
import { AES, enc } from 'crypto-js'
import SelectBox from '../../components/reportes/SelectBox'
import TarjetaAsistencia from '../../components/reportes/TarjetaAsistencia'
import Barras from '../../components/reportes/graficos/Barras'
import BarrasAsistencia from '../../components/reportes/graficos/BarrasAsistencia'
import Circular from '../../components/reportes/graficos/Circular'
import Tarjeta from '../../components/reportes/Tarjeta'
import ObtenerDatos from '../../components/formulario/Helpers/hooks/ObtenerDatos'
import AssessmentIcon from '@mui/icons-material/Assessment'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import AddModeratorIcon from '@mui/icons-material/AddModerator'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import DeleteIcon from '@mui/icons-material/Delete'
import SortIcon from '@mui/icons-material/Sort'
import Loading from '../../components/essentials/Loading'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import logo from '../../assets/logo.png'
import pdfMake from 'pdfmake/build/pdfmake'
import html2canvas from 'html2canvas'

pdfMake.vfs = pdfFonts.pdfMake.vfs

const Reportes = () => {
    const tokenD = AES.decrypt(
        localStorage.getItem('token'),
        import.meta.env.VITE_TOKEN_KEY
    )

    const token = tokenD.toString(enc.Utf8)
    const [apiDataUsuariosSector, setApiDataUsuariosSector] = useState([])
    const [apiDataAsistenciasSector, setApiDataAsistenciasSector] = useState([])
    const [apiDataUser, setApiDataUser] = useState([])
    const [apiDataAsis, setApiDataAsis] = useState([])

    const [departamentos, setDepartamentos] = useState([])
    const [nucleos, setNucleos] = useState([])
    const [nucleosFiltrados, setNucleosFiltrados] = useState([])
    const [core, setCore] = useState('')
    const [departamento, setDepartamento] = useState('')
    const [mostrar, setMostrar] = useState(true)

    const [totalUsuarios, setTotalUsuarios] = useState(0)
    const [usuariosActivos, setUsuariosActivos] = useState(0)
    const [ingresosMes, setIngresosMes] = useState(0)

    const [totalAsistencias, setTotalAsistencias] = useState(0)
    const [totalTardanzas, setTotalTardanzas] = useState(0)
    const [totalFaltas, setTotalFaltas] = useState(0)
    const [totalJustificaciones, setTotalJustificaciones] = useState(0)

    const [totalJus, setTotalJus] = useState(0)
    const [aceptado, setAceptado] = useState(0)
    const [enProceso, setEnProceso] = useState(0)
    const [rechazado, setRechazado] = useState(0)

    const [loading, setLoading] = useState(true)
    const [isCore, seIsCore] = useState(false)
    const [isDepart, setIsDepart] = useState(false)

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const url = new URL(import.meta.env.VITE_API_URL + '/reports/list')
            url.searchParams.append('page', 0)

            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.ok) {
                const data = await response.json()
                setApiDataUser(data.reportes_usuarios.reporte_general)
                setApiDataAsis(data.reportes_asistencias)

                //----------------------------------------------
                setTotalUsuarios(
                    data.reportes_usuarios.reporte_total.total_usuarios
                )
                setUsuariosActivos(
                    data.reportes_usuarios.reporte_total.usuarios_activos
                )
                setIngresosMes(
                    data.reportes_usuarios.reporte_total.ingresos_mes[0].count
                )

                /////
                const sumUniqueValues = (data, property) => {
                    const uniqueValues = [
                        ...new Set(data.map(item => item[property])),
                    ]
                    return uniqueValues.reduce((acc, count) => acc + count, 0)
                }

                const totalAsistencias = sumUniqueValues(
                    data.reportes_asistencias,
                    'department_attendance_count'
                )
                const totalFaltas = sumUniqueValues(
                    data.reportes_asistencias,
                    'department_absence_count'
                )
                const totalTardanzas = sumUniqueValues(
                    data.reportes_asistencias,
                    'department_delay_count'
                )
                const totalJustificaciones = sumUniqueValues(
                    data.reportes_asistencias,
                    'department_justification_count'
                )

                setTotalAsistencias(totalAsistencias)
                setTotalFaltas(totalFaltas)
                setTotalTardanzas(totalTardanzas)
                setTotalJustificaciones(totalJustificaciones)

                /////
                setAceptado(
                    data.reportes_justificacion[0].total_justification_aceptado
                )
                setRechazado(
                    data.reportes_justificacion[0].total_justification_rechazado
                )
                setEnProceso(
                    data.reportes_justificacion[0]
                        .total_justification_en_proceso
                )
                setTotalJus(data.reportes_justificacion[0].total_justifications)

                //----------------------------------------------
                const filteredData =
                    data.reportes_usuarios.reporte_general.reduce(
                        (acc, current) => {
                            if (
                                !acc.find(
                                    item =>
                                        item.department_name ===
                                        current.department_name
                                )
                            ) {
                                acc.push(current)
                            }
                            return acc
                        },
                        []
                    )
                setApiDataUsuariosSector(filteredData)
                const filteredAsisData = data.reportes_asistencias.filter(
                    (item, index, self) => {
                        return (
                            self.findIndex(
                                el =>
                                    el.department_name === item.department_name
                            ) === index
                        )
                    }
                )
                setApiDataAsistenciasSector(filteredAsisData)
                setLoading(false)
            } else {
                console.error('Error al obtener datos de informes')
            }
        }

        fetchData()
    }, [token])

    useEffect(() => {
        async function fetchData() {
            const listaDepartamentos = await ObtenerDatos(token, 'departments')
            const listaNucleos = await ObtenerDatos(token, 'cores')
            setNucleos(listaNucleos)
            setDepartamentos(listaDepartamentos)
        }
        fetchData()
    }, [])

    const filtrar = () => {
        let datosFiltrados = []
        let datosFiltradoAsistencia = []

        const departamentoMappings = {
            1: {
                name: 'Departamento Operativo',
                cores: {
                    5: 'Creativo',
                    6: 'Audiovisual',
                    10: 'Marca Cliente',
                    11: 'Marca Proyecto',
                    33: 'Marketing',
                },
            },
            2: {
                name: 'Departamento Comercial',
                cores: {
                    31: 'Atencion al Cliente',
                    32: 'Ejecutivo de Cuentas',
                    8: 'Logística',
                    9: 'Comercial',
                },
            },
            3: {
                name: 'Departamento Estratégico',
                cores: {
                    34: 'Analisis de Datos',
                    4: 'Publicidad Digital',
                },
            },
            15: {
                name: 'Departamento Gestion',
                cores: {
                    3: 'Talento Humano',
                    2: 'Administracion',
                },
            },
            14: {
                name: 'Departamento Automatizacion',
                cores: {
                    1: 'Sistemas',
                    7: 'Diseño Web',
                },
            },
        }

        const departamentoInfo = departamentoMappings[departamento]

        if (departamentoInfo) {
            datosFiltrados = apiDataUser.filter(
                dato => dato.department_name == departamentoInfo.name
            )
            datosFiltradoAsistencia = apiDataAsis.filter(
                dato => dato.department_name == departamentoInfo.name
            )
            setIsDepart(true)
            const coreName = departamentoInfo.cores[core]
            if (coreName) {
                datosFiltrados = apiDataUser.filter(
                    dato => dato.core_name == coreName
                )
                datosFiltradoAsistencia = apiDataAsis.filter(
                    dato => dato.core_name == coreName
                )
                seIsCore(true)
            }
        }

        setApiDataUsuariosSector(datosFiltrados)
        setApiDataAsistenciasSector(datosFiltradoAsistencia)
        setMostrar(true)
    }

    const borrar = () => {
        window.location.reload()
    }

    const mostrarNucleo = id_departamento => {
        const filtrado = nucleos.filter(
            nucleo => id_departamento == nucleo.department.id
        )
        setNucleosFiltrados(filtrado)
    }

    const loadImage = async imagePath => {
        const response = await fetch(imagePath)
        const blob = await response.blob()
        return new Promise(resolve => {
            const reader = new FileReader()
            reader.onload = event => {
                resolve(event.target.result)
            }
            reader.readAsDataURL(blob)
        })
    }

    const generatePDF = async () => {
        const pdfContent = []

        const logoDataUrl = await loadImage(logo)

        pdfContent.push({
            columns: [
                {
                    image: logoDataUrl,
                    fit: [100, 100],
                    width: 100,
                    alignment: 'left',
                    margin: [0, 0, 0, 20],
                },
                {
                    text: 'Agencia Consigue Ventas Online'.toUpperCase(),
                    style: 'title',
                    alignment: 'center',
                    margin: [30, 15, 30, 0],
                    // alignment: "right",
                    bold: true,
                    fontSize: 32,
                },
            ],
        })

        const tableData = [
            [
                {
                    text: 'USUARIOS',
                    style: 'subheader',
                    alignment: 'center',
                },
                {
                    text: 'ASISTENCIAS',
                    style: 'subheader',
                    alignment: 'center',
                },
                {
                    text: 'JUSTIFICACIONES',
                    style: 'subheader',
                    alignment: 'center',
                },
            ],
            [
                {
                    ul: [
                        `Total: ${totalUsuarios}`,
                        `Activos: ${usuariosActivos}`,
                        `Ingresos último mes: ${ingresosMes}`,
                    ],
                    alignment: 'left',
                },
                {
                    ul: [
                        `Total: ${totalAsistencias}`,
                        `Tardanzas: ${totalTardanzas}`,
                        `Faltas: ${totalFaltas}`,
                        `Justificaciones: ${totalJustificaciones}`,
                    ],
                    alignment: 'left',
                },
                {
                    ul: [
                        `Total: ${totalJus}`,
                        `Aceptadas: ${aceptado}`,
                        `Rechazadas: ${rechazado}`,
                        `En proceso: ${enProceso}`,
                    ],
                    alignment: 'left',
                },
            ],
        ]

        pdfContent.push({
            table: {
                widths: ['*', '*', '*'],
                body: tableData,
            },
        })
        /////////////////////////////////////////////////////////////////////////

        pdfContent.push('\n', {
            text: 'USUARIOS POR SECTORES: ',
            style: 'subheader',
        })

        pdfContent.push('\n')

        if (isDepart && !isCore) {
            const uniqueCoreNames = new Set()
            const usuariosSectorData = []

            apiDataUsuariosSector.forEach(sector => {
                const coreName = sector.core_name.toUpperCase()
                if (!uniqueCoreNames.has(coreName)) {
                    uniqueCoreNames.add(coreName)
                    usuariosSectorData.push([
                        { text: coreName, style: 'subheader1' },
                        {
                            text: `Usuarios activos: ${sector.core_user_count}`,
                            style: 'subheader2',
                        },
                    ])
                }
            })

            pdfContent.push({
                table: {
                    widths: ['*', '*'],
                    body: usuariosSectorData,
                },
            })
        } else if (isDepart && isCore) {
            const usuariosCoreData = apiDataUsuariosSector.map(sector => [
                {
                    text: sector.profile_name.toUpperCase(),
                    style: 'subheader1',
                },
                {
                    text: `Usuarios activos: ${sector.profile_user_count}`,
                    style: 'subheader2',
                },
            ])

            pdfContent.push({
                table: {
                    widths: ['*', '*'],
                    body: usuariosCoreData,
                },
            })
        } else {
            const usuariosSectorData = apiDataUsuariosSector.map(sector => [
                {
                    text: sector.department_name.toUpperCase(),
                    style: 'subheader1',
                },
                {
                    text: `Usuarios activos: ${sector.department_user_count}`,
                    style: 'subheader2',
                },
            ])

            pdfContent.push({
                table: {
                    widths: ['*', '*'],
                    body: usuariosSectorData,
                },
            })
        }
        pdfContent.push('\n\n')

        const usuariosActivosPorSector = document.querySelector(
            '.usuarios-activos-por-sector'
        )
        if (usuariosActivosPorSector) {
            const usuariosActivosCanvas = await html2canvas(
                usuariosActivosPorSector
            )
            const usuariosActivosDataUrl =
                usuariosActivosCanvas.toDataURL('image/png')
            pdfContent.push({ image: usuariosActivosDataUrl, width: 515 })
        }

        /////////////////////////////////////////////////////////////////////////
        if (apiDataAsistenciasSector.length > 0) {
            pdfContent.push('\n', {
                text: 'ASISTENCIA POR SECTORES:',
                style: 'subheader',
            })
            pdfContent.push('\n')

            const processedNames = new Set()
            const asistenciasSectorData = []

            apiDataAsistenciasSector.forEach(sector => {
                let name, attendance, absence, delay, justification

                if (isDepart && !isCore) {
                    name = sector.core_name.toUpperCase()

                    if (!processedNames.has(name)) {
                        processedNames.add(name)
                        attendance = sector.core_attendance_count
                        absence = sector.core_absence_count
                        delay = sector.core_delay_count
                        justification = sector.core_justification_count

                        asistenciasSectorData.push([
                            { text: name, style: 'subheader1' },
                            { text: attendance, style: 'subheader2' },
                            { text: delay, style: 'subheader2' },
                            { text: absence, style: 'subheader2' },
                            { text: justification, style: 'subheader2' },
                        ])
                    }
                } else if (isDepart && isCore) {
                    name = sector.profile_name.toUpperCase()
                    attendance = sector.profile_attendance_count
                    absence = sector.profile_absence_count
                    delay = sector.profile_delay_count
                    justification = sector.profile_justification_count

                    asistenciasSectorData.push([
                        { text: name, style: 'subheader1' },
                        { text: attendance, style: 'subheader2' },
                        { text: delay, style: 'subheader2' },
                        { text: absence, style: 'subheader2' },
                        { text: justification, style: 'subheader2' },
                    ])
                } else {
                    name = sector.department_name.toUpperCase()
                    attendance = sector.department_attendance_count
                    absence = sector.department_absence_count
                    delay = sector.department_delay_count
                    justification = sector.department_justification_count

                    asistenciasSectorData.push([
                        { text: name, style: 'subheader1' },
                        { text: attendance, style: 'subheader2' },
                        { text: delay, style: 'subheader2' },
                        { text: absence, style: 'subheader2' },
                        { text: justification, style: 'subheader2' },
                    ])
                }
            })

            pdfContent.push({
                table: {
                    widths: [140, '*', '*', '*', '*'],
                    body: [
                        [
                            {
                                text: '',
                                style: 'tableHeader',
                                alignment: 'center',
                            },
                            {
                                text: 'Asistencias',
                                style: 'tableHeader',
                                alignment: 'center',
                            },
                            {
                                text: 'Tardanzas',
                                style: 'tableHeader',
                                alignment: 'center',
                            },
                            {
                                text: 'Faltas',
                                style: 'tableHeader',
                                alignment: 'center',
                            },
                            {
                                text: 'Justificaciones',
                                style: 'tableHeader',
                                alignment: 'center',
                            },
                        ],
                        ...asistenciasSectorData,
                    ],
                },
            })
        }

        pdfContent.push('\n\n')

        const asistenciaPorSector = document.querySelector(
            '.asistencia-por-sector'
        )
        if (asistenciaPorSector) {
            const asistenciaCanvas = await html2canvas(asistenciaPorSector)
            const asistenciaDataUrl = asistenciaCanvas.toDataURL('image/png')
            pdfContent.push({ image: asistenciaDataUrl, width: 515 })
        }

        const styles = {
            header: {
                fontSize: 18,
                bold: true,
                alignment: 'center',
                margin: [0, 0, 0, 10],
            },
            subheader: {
                fontSize: 14,
                bold: true,
                margin: [0, 10, 0, 5],
            },
            subheader1: {
                fontSize: 12,
                bold: true,
                margin: [0, 6, 0, 3],
            },
            subheader2: {
                fontSize: 12,
                margin: [0, 10, 0, 5],
                font: 'Roboto',
                alignment: 'center',
            },
            title: {
                fontSize: 20,
                bold: true,
                alignment: 'center',
                margin: [0, 10, 0, 10],
                color: '#0072b1',
            },
        }

        const documentDefinition = {
            content: pdfContent,
            styles: styles,
        }

        pdfMake
            .createPdf(documentDefinition)
            .download('consigue_ventas_report.pdf')
    }

    return (
        <div className='flex flex-col items-center w-full gap-10 '>
            <section className='flex flex-col gap-5 '>
                <h1 className='inline-flex items-center w-full text-base font-medium text-white uppercase'>
                    <AssessmentIcon />
                    <span className='ml-1 text-base font-medium md:ml-2'>
                        REPORTES
                    </span>
                </h1>
                <div className='flex items-start justify-between'>
                    <div className='flex flex-wrap w-full gap-10'>
                        <SelectBox
                            label={'Departamento'}
                            data={departamentos}
                            mostrarNucleo={mostrarNucleo}
                            valor={departamento}
                            setSelectedValue={setDepartamento}></SelectBox>
                        <SelectBox
                            label={'Núcleo'}
                            data={nucleosFiltrados}
                            valor={core}
                            setSelectedValue={setCore}></SelectBox>
                    </div>
                    <div className='flex gap-3'>
                        <button
                            className='p-2 rounded pl-4 pr-4 text-gray-950 bg-red-500 flex items-center hover:bg-red-600'
                            onClick={generatePDF}>
                            <PictureAsPdfIcon className='mr-2' />
                            <strong>Reporte</strong>
                        </button>

                        <button
                            className='p-2 rounded pl-4 pr-4 text-gray-950 bg-cv-cyan ml-4 flex items-center hover:bg-cv-cyan-dark'
                            onClick={filtrar}>
                            <SortIcon className='mr-2' />
                            <strong>Filtrar</strong>
                        </button>

                        <button
                            className='p-2 pl-3 pr-3 rounded bg-cv-primary ml-4 flex items-center hover:bg-cv-primary-dark'
                            onClick={borrar}>
                            <DeleteIcon className='mr-2' />
                            <strong>Limpiar</strong>
                        </button>
                    </div>
                </div>
            </section>
            {mostrar ? (
                <div
                    id='report-container'
                    className='flex flex-col items-center w-full gap-10'>
                    <>
                        {loading ? (
                            <Loading />
                        ) : (
                            <section>
                                <section className='flex flex-wrap items-start justify-start w-full py-3 text-2xl border-t-2 '>
                                    <h1 className='inline-flex items-center w-full text-base font-medium text-white uppercase'>
                                        <PeopleAltIcon />
                                        <span className='ml-1 text-base font-medium md:ml-2'>
                                            USUARIOS
                                        </span>
                                    </h1>
                                    <div className='flex flex-wrap justify-between w-full gap-4 mt-4 gap-y-2 sm:flex-nowrap'>
                                        <Tarjeta
                                            titulo='TOTAL DE USUARIOS'
                                            porcentaje={100}
                                            numero={totalUsuarios}
                                        />
                                        <Tarjeta
                                            titulo='USUARIOS ACTIVOS'
                                            porcentaje={90}
                                            numero={usuariosActivos}
                                        />
                                        <Tarjeta
                                            titulo='INGRESOS ÚLTIMO MES'
                                            porcentaje={10}
                                            numero={ingresosMes}
                                        />
                                    </div>
                                    <div className='box-border flex items-start justify-between w-full gap-7'>
                                        <div className='flex flex-col items-start w-full gap-4 p-5 mt-4 text-sm rounded-lg bg-cv-primary h-80 box usuarios-activos-por-sector'>
                                            <h1 className='text-lg font-medium'>
                                                USUARIOS ACTIVOS POR SECTOR
                                            </h1>
                                            <Barras
                                                barras={apiDataUsuariosSector}
                                                isCore={isCore}
                                                isDepart={isDepart}
                                            />
                                        </div>
                                    </div>
                                </section>
                                <section className='w-full py-3 text-2xl border-t-2 '>
                                    <h1 className='inline-flex items-center w-full text-base font-medium text-white uppercase'>
                                        <PlaylistAddIcon />
                                        <span className='ml-1 text-base font-medium md:ml-2'>
                                            ASISTENCIAS
                                        </span>
                                    </h1>
                                    <article>
                                        <div className='box-content flex items-start justify-start w-full gap-4 '>
                                            <div className='box-border w-2/6 p-5 mt-4 text-sm rounded-lg bg-cv-primary h-80'>
                                                <TarjetaAsistencia
                                                    name1='Asistencias'
                                                    name2='Tardanzas'
                                                    name3='Faltas'
                                                    name4='Justificaciones'
                                                    asistencias={
                                                        totalAsistencias
                                                    }
                                                    faltas={totalFaltas}
                                                    justificaciones={
                                                        totalJustificaciones
                                                    }
                                                    tardanzas={totalTardanzas}
                                                />
                                            </div>
                                            <div className='box-border flex flex-col justify-between w-5/6 p-5 mt-4 text-sm rounded-lg bg-cv-primary h-80 asistencia-por-sector'>
                                                <h1 className='text-lg font-medium '>
                                                    ASISTENCIAS POR SECTORES
                                                </h1>
                                                <div className='w-full h-5/6'>
                                                    <BarrasAsistencia
                                                        barras={
                                                            apiDataAsistenciasSector
                                                        }
                                                        isCore={isCore}
                                                        isDepart={isDepart}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </section>
                                <section className='flex flex-wrap items-start justify-start w-full py-3 text-2xl border-t-2 '>
                                    <h1 className='inline-flex items-center w-full text-base font-medium text-white uppercase'>
                                        <AddModeratorIcon />
                                        <span className='ml-1 text-base font-medium md:ml-2'>
                                            JUSTIFICACIONES
                                        </span>
                                    </h1>
                                    <div className='box-content flex items-start justify-start w-full gap-4 '>
                                        <div className='box-border flex flex-col justify-between w-3/6 p-5 mt-4 text-sm rounded-lg bg-cv-primary h-80'>
                                            <h1 className='text-lg font-medium '>
                                                Estado de Justificaciones
                                            </h1>
                                            <div className='w-full h-full'>
                                                <Circular
                                                    primero={aceptado}
                                                    segundo={enProceso}
                                                    tercero={rechazado}
                                                />
                                            </div>
                                        </div>
                                        <div className='box-border w-3/6 p-5 mt-4 text-sm rounded-lg bg-cv-primary h-80'>
                                            <TarjetaAsistencia
                                                name1='Total de justificaciones'
                                                name2='Justifiaciones Aceptadas'
                                                name3='Justificaciones Rechazadas'
                                                name4='Justificaciones en Progreso'
                                                asistencias={totalJus}
                                                faltas={aceptado}
                                                justificaciones={enProceso}
                                                tardanzas={rechazado}
                                            />
                                        </div>
                                    </div>
                                </section>
                            </section>
                        )}
                    </>
                </div>
            ) : (
                <section className='flex items-center justify-center w-full h-full mt-20'>
                    <img src='./2Q.png' alt='' className='w-1/4 rounded-2xl ' />
                </section>
            )}
        </div>
    )
}

export default Reportes
