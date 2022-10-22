import React, {useState, useEffect} from 'react';
import { Modal, Button, Form, Col, Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FiEye, FiTrash, FiEdit2, FiRefreshCw} from 'react-icons/fi'

import FormCreate from '../../components/Form'
import FormEdit from '../../components/FormEdit'
import FormShow from '../../components/FormShow'

import api from '../../services/api';
import 'rsuite/dist/rsuite.min.css';
import DateRangePicker from 'rsuite/DateRangePicker';

import './index.css';

function Produtos({title}){

    const [show, setShow] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [products, setProducts] = useState([]);
    const[id, setId] = useState('');
    const[query, setQuery] = useState(['?', '', '', '', '', '']);

    const[alert, setAlert] = useState(false)
    const[textAlert, setTextAlert] = useState('')
    const[textVariant, setTextVariant] = useState('')

    const[cubagem, setCubagem] = useState(true)

    const [tableStatus, setTableStatus] = useState(1)
    const [tableTextStatus, setTableTextStatus] = useState('Ativo')

    const handleClose = () => setShow(false);
    const handleShow = (id, status) => {
        console.log(status)
        hanldeModal(id, 'show')
        setCubagem(status)
    }

    const handleCreateClose = () => setShowCreate(false);
    const handleCreateShow = () => setShowCreate(true);

    const handleEditClose = () => setShowEdit(false)
    const handleEditShow = (id) => hanldeModal(id, 'edit')

    function hanldeModal(id, event){
        switch (event) {
            case 'edit':
                setShowEdit(true)
                setId(id)
              break;
            case 'show':
                setShow(true)
                setId(id)
              break;
            default:
              return;
          }
       
    }

    async function handleDelete(id){
        try {
            await api.delete(`/api/product/${id}`)
            await getProducts(tableStatus)
            handleAlert('Produto removido com sucesso!', 'success');
        } catch (error) {
            alert(error)
            handleAlert(error, 'warning');
        }
    }

    async function handleActivate(id){
        try {
            await api.put(`/api/product/status/${id}`)
            await getProducts(tableStatus)
            handleAlert('Status alterado com sucesso!', 'success');
        } catch (error) {
            alert(error)
            handleAlert(error, 'warning');
        }
    }


    async function handleFilter(e){
      let status = tableStatus;
      if(e.target){
        if(e.target.id === "formGridName"){
            query[1]= e.target.value !== '' ? e.target.value : ''
        }
        if(e.target.id === "FormGridSegmento"){
            query[2]= e.target.value !== '' ? e.target.value : ''
        }
        if(e.target.id === "FormGridGrupo"){
            query[3]= e.target.value !== '' ? e.target.value : ''
        }
        if(e.target.id === "formGridStatus"){
            status = tableStatus !== 0 ? 0 : 1
            setTableStatus(status);
            let text = tableStatus === 1 ? 'Inativo' : 'Ativo'
            setTableTextStatus(text)
        }
      }

        if(e[0]){
            
           let start = new Date(e[0]);
           let end = new Date(e[1]);
           let startDate = start.toLocaleString();
           let endDate = end.toLocaleString();
        
           const regex = new RegExp('/', 'g');

           let finalStart = startDate.replace(regex, '-');
           let finalEnd = endDate.replace(regex, '-');
           
           query[4]= finalStart;
           query[5]= finalEnd;

        }else{
            query[4]= ''
            query[5]= ''
        }
        
        api.get('api/product'+`${query[0]}&string=${query[1]}&segmento=${query[2]}&grupo=${query[3]}&start=${query[4]}&end=${query[5]}&status=${status}`)
        .then((response)=>{
            setProducts([])
            return response
        })
        .then((resp)=>{
            setProducts(resp.data)
            console.log(resp)
        })
    }

    useEffect(()=>{
        getProducts(tableStatus)
    }, [tableStatus])

    async function getProducts(status){
        api.get('api/product?status='+status)
        .then((response)=>{
            setProducts(response.data)
        })
    }

    async function handleAlert(text, variant){
        setAlert(true)
        setTextAlert(text)
        setTextVariant(variant)

        setTimeout(()=>{
            setAlert(false)
            setTextAlert('')
            setTextVariant('')
        }, 4000)
    }
    

    return (
        
      <div className="main-produtos">
        { alert === true ? <Alert  variant={textVariant}>{textAlert}</Alert> : ''}
        <div className="filters">
            {/* <label></label> */}
            <Form.Group as={Col} className="col-1" controlId="fomrStatus">
                <Form.Label>Status</Form.Label>
                <Form.Check 
                    type="switch"
                    id="formGridStatus"
                    label={tableTextStatus}
                    checked={tableStatus}
                    onChange={handleFilter}
                />
            </Form.Group>
            <Form.Group as={Col} className="col-3" controlId="formGridName">
                <Form.Label>Pesquisar</Form.Label>
                <Form.Control type="text" placeholder="Digite o nome do produto" onKeyUp={handleFilter} />
            </Form.Group>


      
            <Form.Group controlId="FormGridSegmento" className="col-2" onChange={handleFilter} >
                <Form.Label>Segmento</Form.Label>
                <Form.Select >
                    <option value="">Selecione</option>
                    <option value="Offgrid">OffGrid</option>
                    <option value="Ongrid">OnGrid</option>
                </Form.Select>
            </Form.Group>
            <Form.Group controlId="FormGridGrupo" className="col-2" onChange={handleFilter} >
                <Form.Label>Grupo</Form.Label>
                <Form.Select >
                    <option value="">Selecione</option>
                    <option value="Perfil">Perfil</option>
                    <option value="Modulo">Módulo</option>
                    <option value="Inversor">Inversor</option>
                    <option value="Cabos">Cabos</option>
                    <option value="Conectores e Baterias">Conectores e Baterias</option>
                </Form.Select>
            </Form.Group>

            <Form.Group as={Col} className="col-2 date" onChange={handleFilter}>
                <Form.Label>Data</Form.Label>
                <DateRangePicker id="FormGridData" placeholder="Selecione uma data" onChange={handleFilter} />
            </Form.Group>

            <Button variant="success" onClick={handleCreateShow}>Novo Produto</Button>
        </div>
        
        <table className="mt-4 table-produtos">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Status</th>
                    <th>Nome</th>
                    <th>Data de Criação</th>
                    <th>Grupo</th>
                    <th>Segmento</th>
                    <th>Ações</th>
                </tr>
            </thead>

            <tbody>
            {products.map(produto =>( 
                <tr key={produto.id}>
                    <td>{produto.id}</td>
                    <td>{produto.status === 0 ? 'Inativo' : 'Ativo'}</td>
                    <td>{produto.nome}</td>
                    <td>{(()=>{
                        let date = produto.created_at;
                        let arrayDate = date.split(" ");
                        return arrayDate[0];
                    })()}</td>
                    <td>{produto.grupo}</td>
                    <td>{produto.segmento}</td>
                    <td> 
                    <div className="actions">     
                        {(() => {
                            switch (produto.status) {
                            case 1:   return    <>
                                                    <OverlayTrigger placement="top" overlay = {<Tooltip id={`tooltip-top`}>Visualizar Produto</Tooltip>}>
                                                        <Button variant="secondary" onClick={() => handleShow(produto.id, true)}>
                                                            <FiEye/>
                                                        </Button>
                                                    </OverlayTrigger>

                                                    <OverlayTrigger placement="top" overlay = {<Tooltip id={`tooltip-top`}>Editar Produto</Tooltip>}>
                                                        <Button variant="primary" onClick={() => handleEditShow(produto.id)}>
                                                            <FiEdit2/>
                                                        </Button>
                                                    </OverlayTrigger>
                                                    <OverlayTrigger placement="top" overlay = {<Tooltip id={`tooltip-top`}>Remover Produto</Tooltip>}>
                                                        <Button variant="danger" onClick={() => handleDelete(produto.id)}>
                                                            <FiTrash/>
                                                        </Button>
                                                    </OverlayTrigger>
                                                </>;
                            case 0: return <>
                                           
                                            <OverlayTrigger placement="top" overlay = {<Tooltip id={`tooltip-top`}>Visualizar Produto</Tooltip>}>
                                                <Button variant="secondary" onClick={() => handleShow(produto.id, false)}>
                                                    <FiEye/>
                                                </Button>
                                            </OverlayTrigger>

                                            <OverlayTrigger placement="top" overlay = {<Tooltip id={`tooltip-top`}>Reativar Produto</Tooltip>}>
                                                <Button variant="success" onClick={() => handleActivate(produto.id)}>
                                                    <FiRefreshCw/>
                                                </Button>
                                            </OverlayTrigger>
                                            </>;
                                            
                            default: return "";
                            }
                        })()}
                    </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>

          <Modal  show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Visualização</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <FormShow editId={id} tableStatus={tableStatus} getProducts={getProducts} handleClose={handleClose} handleAlert={handleAlert} showCubagem={cubagem}/>
            </Modal.Body>
        </Modal>

        <Modal  show={showCreate} onHide={handleCreateClose}>
            <Modal.Header closeButton>
            <Modal.Title>Novo Produto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormCreate getProducts={getProducts} handleCreateClose={handleCreateClose} handleAlert={handleAlert} tableStatus={tableStatus}/>
            </Modal.Body>
        </Modal>

        
        <Modal show={showEdit} onHide={handleEditClose}>
            <Modal.Header closeButton>
            <Modal.Title>Editar Produto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormEdit editId={id} getProducts={getProducts} tableStatus={tableStatus} handleEditClose={handleEditClose}  handleAlert={handleAlert}/>
            </Modal.Body>
        </Modal>
             
      </div>

    )
}

export default Produtos;