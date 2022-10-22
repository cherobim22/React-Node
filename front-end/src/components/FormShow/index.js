import React, {useState, useEffect} from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../services/api';


export default function FormShow({editId, tableStatus, getProducts, handleEditClose,handleAlert, showCubagem}){
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
    const[quantidade, setQuantidade] = useState('')
    const[cubagem, setCubagem] = useState('');
    const[peso, setPeso] = useState('');
    const[pesoLiquidoTotal, setPesoLiquidoTotal] = useState('');
    const[pesoBrutoTotal, setPesoBrutoTotal] = useState('');
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
            response.data.status === 1 ? setAtivo(1) : setInativo(0)


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
        let id = editId;
        let data = {
            id, quantidade
        }

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.stopPropagation();
        }
    
        setValidated(true);

        await api.post('/api/projetos/expedicao', data )
        .then((resp) => {
            setCubagem(resp.data.cubagem);
            setPeso(resp.data.peso_cubado);
            setPesoLiquidoTotal(resp.data.peso_liquido)
            setPesoBrutoTotal(resp.data.peso_bruto)
        })
    }

    return(
        <>
        <Form  as={Col}>
             <Row className="mb-3 col-12">
                <Form.Group as={Col} controlId="formNome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control placeholder="Digite o nome do produto"  value={nome} onChange={e => setNome(e.target.value)} disabled/>
                </Form.Group>
            </Row>
            <Row className="mb-3 col-12">
                <Form.Group as={Col} controlId="formGridLargura">
                <Form.Label>Largura <small>*m</small></Form.Label>
                <Form.Control type="number" placeholder="Digite a largura" value={largura} onChange={e => setLargura(e.target.value)} disabled/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAltura">
                <Form.Label>Altura <small>*m</small></Form.Label>
                <Form.Control type="number" placeholder="Digite a altura" value={altura} onChange={e => setAltura(e.target.value)} disabled />
                </Form.Group>
            </Row>

            <Row className="mb-3 col-12">
                <Form.Group as={Col} controlId="formGridPesoLiquido">
                <Form.Label>Peso Líquido <small>*kg</small></Form.Label>
                <Form.Control type="number" placeholder="Digite o peso líquido" value={peso_liquido} onChange={e => setPesoLiquido(e.target.value)} disabled/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPesoBruto">
                <Form.Label>Peso Bruto <small>*kg</small></Form.Label>
                <Form.Control type="number" placeholder="Digite o peso bruto" value={peso_bruto} onChange={e => setPesoBruto(e.target.value)} disabled/>
                </Form.Group>
            </Row>
            <Row className="mb-3 col-6">
                <Form.Group as={Col} controlId="formGridProfundidade">
                <Form.Label>Profundidade <small>*m</small></Form.Label>
                <Form.Control type="number" placeholder="Digite a profundidade" value={profundidade} onChange={e => setProfundidade(e.target.value)} disabled/>
                </Form.Group>
            </Row>

            <Row className="mb-3 col-12">
                <Form.Group className="mb-3" as={Col} controlId="formGTIN">
                    <Form.Label>GTIN</Form.Label>
                    <Form.Control placeholder=" 00012345678905" value={GTIN} onChange={e => setGTIN(e.target.value)} disabled/>
                </Form.Group>
            </Row>
         

            <Row className="mb-3 col-12">
                <Form.Group as={Col} controlId="formGridState" >
                    <Form.Label>Grupo</Form.Label>
                    <Form.Select value={grupo} onChange={e => setGrupo(e.target.value)} disabled>
                        <option>Selecione</option>
                        <option value="Perfil">Perfil</option>
                        <option value="Modulo">Modulo</option>
                        <option value="Inversor">Inversor</option>
                        <option value="Cabos">Cabos</option>
                        <option value="Conectores e Baterias">Conectores e Baterias</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Segmento</Form.Label>
                    <Form.Select value={segmento} onChange={e => setSegmento(e.target.value)} disabled>
                        <option>Selecione</option>
                        <option value="Ongrid">OffGrid</option>
                        <option value="Offgrid">OnGrid</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} className="d-flex flex-column"  controlId="formGridState">
                    <Form.Label >
                        Status
                    </Form.Label>
                    <Col>                
                        <Form.Check
                        disabled 
                        type="radio"
                        label="Ativo"
                        name="status"
                        id="status1"
                        checked ={ativo}
                        onChange={() => handleCheckbox(true)}
                        />
                        <Form.Check
                        disabled 
                        type="radio"
                        label="Inativo"
                        name="status"
                        checked ={inativo}
                        id="status2"
                        onChange={() => handleCheckbox(false)}
                        />
                    </Col>      
                </Form.Group>
            </Row>
        </Form>
        {(()=>{
            if(showCubagem === true){
                return <>
                    <Col>
                        <h5>Calculo de cubagem</h5>
                        <Form onSubmit={handleSubmit} noValidate validated={validated}>
                            
                            <Row>
                                <Form.Group as={Col}  className="mb-3 mt-3" controlId="formVolume">
                                    <Form.Label>Quantidade de volumes</Form.Label>
                                    <Form.Control type="number" placeholder="Quantidade de volumes" value={quantidade} onChange={e => setQuantidade(e.target.value)} required/>
                                </Form.Group>
                            </Row>
                        <Row>
                        <Form.Group as={Col} className="mb-3" >
                                <Form.Label>Cubagem <small>*M³</small></Form.Label>
                                <Form.Control type="number" value={cubagem} placeholder="0000 00 0 " readOnly />
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" >
                                <Form.Label>Peso Cubado <small>*kg</small></Form.Label>
                                <Form.Control type="number" value={peso} placeholder="0000 00 0 " readOnly />
                            </Form.Group>
                        </Row>
                        <Row>
                        <Form.Group as={Col} className="mb-3" >
                                <Form.Label>Peso líquido <small>*kg</small></Form.Label>
                                <Form.Control type="number" value={pesoLiquidoTotal} placeholder="0000 00 0 " readOnly/>
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" >
                            <Form.Label>Peso bruto <small>*kg</small></Form.Label>
                                <Form.Control type="number" value={pesoBrutoTotal} placeholder="0000 00 0 " readOnly/>
                            </Form.Group>
                        </Row>
                            <div className="btn-cubagem">
                                <Button variant="secondary" type="submit">
                                    Calcular
                                </Button>
                            </div>
                            </Form>
                        </Col>
                    </>
            }
        })()}
       
        </>
    )
}