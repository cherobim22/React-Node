import React, {useState, useEffect} from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../services/api';

export default function FormEdit({editId, tableStatus, getProducts, handleEditClose, handleAlert}){
    console.log(editId)
    const[nome, setNome] = useState('');
    const[largura, setLargura] = useState('');
    const[altura, setAltura] = useState('');
    const[profundidade, setProfundidade] = useState('');
    const[peso_liquido, setPesoLiquido] = useState('');
    const[peso_bruto, setPesoBruto] = useState('');
    const[GTIN, setGTIN] = useState('');
    const[grupo, setGrupo] = useState('');
    const[segmento, setSegmento] = useState('');
    const[status, setStatus] = useState('');
    const[ativo, setAtivo] = useState(false);
    const[inativo, setInativo] = useState(false);
    const [validated, setValidated] = useState(false);

    useEffect(()=>{
        setProducts(editId);
    }, [editId])

    async function setProducts(id){
        api.get(`api/product/${id}`)
        .then((response)=>{

            let altura = response.data.altura
            let largura = response.data.largura
            let profundidade = response.data.profundidade
            let peso_liquido = response.data.peso_liquido
            let peso_bruto = response.data.peso_bruto

            setNome(response.data.nome)
            setLargura(largura.replace(',', '.'))
            setAltura(altura.replace(',', '.'))
            setProfundidade(profundidade.replace(',', '.'))
            setPesoLiquido(peso_liquido.replace(',', '.'))
            setPesoBruto(peso_bruto.replace(',', '.'))
            setGTIN(response.data.GTIN)
            setGrupo(response.data.grupo)
            setSegmento(response.data.segmento)
            setStatus(response.data.status)
            response.data.status === 1 ? setAtivo(true) : setInativo(true)
        })
    }

    async function handleCheckbox(value){
        if(value === true){
            setStatus(true)
            setAtivo(true)
            setInativo(false)
        }else{
            setStatus(false)
            setAtivo(false)
            setInativo(true)
        }
    }

    async function handleSubmit(e){
        e.preventDefault();
    
        let data = {
            nome, largura, altura, peso_liquido, peso_bruto, profundidade, GTIN, grupo, segmento, status
        }

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
        e.stopPropagation();
        }

        setValidated(true);

       await api.put(`api/product/${editId}`, data)
        .then(() => {
            handleEditClose();
        }).then(async () => {
           await getProducts(tableStatus)  
           handleAlert('Produto atualizado com sucesso!', 'success');
           return 'ok';
        })
        .catch((error) => {
            handleAlert(error, 'warning'); 
        })
    }

    return(
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
            <Row className="mb-3 col-12">
                <Form.Group as={Col}  controlId="formNome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control placeholder="Digite o nome do produto"  value={nome} onChange={e => setNome(e.target.value)} required/>
                </Form.Group>
            </Row>

            <Row className="mb-3 col-12">
                <Form.Group as={Col} controlId="formGridLargura">
                <Form.Label>Largura</Form.Label>
                <Form.Control type="number" placeholder="Digite a largura" value={largura} onChange={e => setLargura(e.target.value)} required />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAltura">
                <Form.Label>Altura</Form.Label>
                <Form.Control type="number" placeholder="Digite a altura" value={altura} onChange={e => setAltura(e.target.value)}  required/>
                </Form.Group>
            </Row>

            <Row className="mb-3 col-12">
                <Form.Group as={Col} controlId="formGridPesoLiquido">
                <Form.Label>Peso Líquido</Form.Label>
                <Form.Control type="number" placeholder="Digite o peso liquido" value={peso_liquido} onChange={e => setPesoLiquido(e.target.value)} required />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPesoBruto">
                <Form.Label>Peso Bruto</Form.Label>
                <Form.Control type="number" placeholder="Digite o peso bruto" value={peso_bruto} onChange={e => setPesoBruto(e.target.value)} required/>
                </Form.Group>
            </Row>
            <Row className="mb-3 col-6">
                <Form.Group as={Col} controlId="formGridProfundidade">
                <Form.Label>Profundidade</Form.Label>
                <Form.Control type="number" placeholder="Digite a profundidade" value={profundidade} onChange={e => setProfundidade(e.target.value)} required/>
                </Form.Group>
            </Row>

            <Row className="mb-3 col-12">
                <Form.Group className="mb-3" controlId="formGTIN">
                    <Form.Label>GTIN</Form.Label>
                    <Form.Control placeholder=" 00012345678905" value={GTIN} onChange={e => setGTIN(e.target.value)} required/>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridState" >
                    <Form.Label>Grupo</Form.Label>
                    <Form.Select value={grupo} onChange={e => setGrupo(e.target.value)} required>
                        <option value="">Selecione</option>
                        <option value="Perfil">Perfil</option>
                        <option value="Modulo">Modulo</option>
                        <option value="Inversor">Inversor</option>
                        <option value="Cabos">Cabos</option>
                        <option value="Conectores e Baterias">Conectores e Baterias</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Segmento</Form.Label>
                    <Form.Select value={segmento} onChange={e => setSegmento(e.target.value)} required>
                        <option value="">Selecione</option>
                        <option value="Offgrid">OffGrid</option>
                        <option value="Ongrid">OnGrid</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} className="d-flex flex-column"  controlId="formGridState">
                    <Form.Label >
                        Status
                    </Form.Label>
                    <Col>
                        <Form.Check
                        required
                        type="radio"
                        label="Ativo"
                        name="status"
                        id="status1"
                        checked ={ativo}
                        // onChange={e => setStatus(true)}
                        onChange={() => handleCheckbox(true)}
                        />
                        <Form.Check
                        required
                        type="radio"
                        label="Inativo"
                        name="status"
                        checked ={inativo}
                        id="status2"
                        // onChange={e => setStatus(false)}

                        onChange={() => handleCheckbox(false)}
                        />
                    </Col>
                </Form.Group>

            </Row>
            <Button variant="primary" type="submit">
                Enviar
            </Button>
        </Form>
    )
}