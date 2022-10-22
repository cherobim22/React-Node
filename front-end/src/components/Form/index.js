import React, {useState} from 'react'
import { Form, Row, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../services/api';

export default function FormCreate({getProducts, handleAlert, handleCreateClose, tableStatus}){

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
    const [validated, setValidated] = useState(false);;

    async function handleSubmitCreate(e){
        e.preventDefault();
        let data = {
            nome, largura, altura, peso_liquido, peso_bruto, profundidade, GTIN, grupo, segmento, status
        }
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
        }

        setValidated(true)
        
        await api.post('api/product', data)
        .then(() => {
            handleCreateClose();
        }).then(async () => {
            await getProducts(tableStatus)  
            handleAlert('Produto cadastrado com sucesso!', 'success');
            return 'ok';
        })
        .catch((error) => {
            alert('deu ruim, '+error);  
        })
    }

    return(
    
        <Form  noValidate validated={validated} onSubmit={handleSubmitCreate}>
            <Row className="mb-3 col-12">
                <Form.Group as={Col}  controlId="formNome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control placeholder="Digite o nome do produto"  value={nome} onChange={e => setNome(e.target.value)} required/>
                </Form.Group>
            </Row>

            <Row className="mb-3 col-12 ">
                <Form.Group as={Col} controlId="formGridLargura">
                <Form.Label>Largura</Form.Label>
                <Form.Control type="number" placeholder="Digite a largura" value={largura} onChange={e => setLargura(e.target.value)} required />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAltura">
                <Form.Label>Altura</Form.Label>
                <Form.Control type="number" placeholder="Digite a altura" value={altura} onChange={e => setAltura(e.target.value)} required />
                </Form.Group>
            </Row>

            <Row className="mb-3 col-12">
                <Form.Group as={Col} controlId="formGridPesoLiquido">
                <Form.Label>Peso Líquido</Form.Label>
                <Form.Control type="number" placeholder="Digite o peso líquido" value={peso_liquido} onChange={e => setPesoLiquido(e.target.value)} required />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPesoBruto">
                <Form.Label>Peso Bruto</Form.Label>
                <Form.Control type="number" placeholder="Digite o peso bruto" value={peso_bruto} onChange={e => setPesoBruto(e.target.value)} required/>
                </Form.Group>
            </Row>
            <Row className="mb-3 col-6">
                <Form.Group as={Col} controlId="formGridProfundidade">
                <Form.Label>Profundidade</Form.Label>
                <Form.Control type="number" placeholder="Digite a profundiade" value={profundidade} onChange={e => setProfundidade(e.target.value)} required />
                </Form.Group>
            </Row>

            <Row className="mb-3 col-12">
                <Form.Group className="mb-3" as={Col} controlId="formGTIN">
                    <Form.Label>GTIN</Form.Label>
                    <Form.Control placeholder=" 00012345678905" value={GTIN} onChange={e => setGTIN(e.target.value)} required/>
                </Form.Group>
            </Row>

            <Row className="mb-3 col-12">
            <Form.Group as={Col} controlId="formGridState" >
                    <Form.Label>Grupo</Form.Label>
                    <Form.Select value={grupo} className="mt-2" onChange={e => setGrupo(e.target.value)} required>
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
                    <Form.Select className="mt-2" value={segmento} onChange={e => setSegmento(e.target.value)} required>
                        <option value="">Selecione</option>
                        <option value="Ongrid">OffGrid</option>
                        <option value="Offgrid">OnGrid</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} className="d-flex flex-column" controlId="formGridState">
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
                        value={status} onChange={e => setStatus(true)}
                        />
                        <Form.Check
                        required
                        type="radio"
                        label="Inativo"
                        name="status"
                        id="status2"
                        value={status} onChange={e => setStatus(false)}
                        />
                    </Col>
                </Form.Group>

            </Row>
            <Button type="submit">
                Enviar
            </Button>
        </Form>  
    )
}