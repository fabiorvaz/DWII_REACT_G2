/**
 * 
 */
//***********************
//Inicio constantes
//***********************
var enderecoAdd = "";
var enderecoDelete = "";
var enderecoEdit = "";
var enderecoLoad = "";
//***********************
//Fim constantes
//***********************

	
var EmpresaBox = React.createClass({
	
	//***********************
	//Inicio funções extras
	//***********************
	
	comunicarAjax: function(caminho, tipo)
	{
		$.ajax({
		      url: caminho,
		      dataType: 'json',
		      type: tipo,
		      success: function(data) {
		        this.setState({data: data});
		      }.bind(this),
		      error: function(xhr, status, err) {
		        console.error(this.props.url, status, err.toString());
		      }.bind(this)
		});
	},
	
	//***********************
	//Fim funções extras
	//***********************
	
	//***********************
	//Inicio funções do CRUD
	//***********************
	
	//Adicionar empresa
	handleAddSubmit: function(id, nome, empresa) {
		//Bloco para teste em memoria pode ser mantido na versão final
	    var empresas = this.state.data;
	    var newEmpresas = empresas.concat([empresa]);
	    this.setState({data: newEmpresas});
		
		comunicarAjax(enderecoAdd.replace("a","b"),'PUT');
	},
	
	handleEditSaveSubmit: function(empresa) {
		comunicarAjax("",'EDIT');
	},
	
	loadBooksFromServer: function() {
		comunicarAjax("",'GET');
	},
	
	handleConfirmaDeleteSubmit: function(id){
		//Bloco para teste em memoria
		var rows = this.state.data.filter(function(elem) {
            return elem.id != id;
        });
		this.setState({data:rows, empresSelecionada: []});
		
		
		comunicarAjax("",'DELETE');
	},
	
	//***********************
	//Fim funções do CRUD
	//***********************

	//*************************
	//Inicio funções de render
	//*************************
	
	handleEditSubmit: function(empresa) {
		this.setState({empresSelecionada: empresa});
	},
	
	handleDeleteSubmit: function(empresa) {
		this.setState({empresSelecionada: empresa});
	},
	
	handleCancelaDeleteSubmit: function(empresa) {
		this.setState({empresSelecionada: []});
	},
	
	handleCancelaEditSubmit: function(empresa) {
		this.setState({empresSelecionada: []});
	},
	
	handleFiltrarSubmit: function(filtro)
	{
		if(!filtro)
		{
			this.setState({data:[]});
			this.setState({data:this.state.dataF});
			return;
		}
		var rows = this.state.data.filter(function(elem) {
			var iValue =elem.nome.toLowerCase().indexOf(filtro.toLowerCase());
            return (iValue != -1);
        });
		this.setState({data:[]});
		this.setState({data:rows});
	},
	
	getInitialState: function() {
	    return {data: data, empresSelecionada:[], dataF: data};
	},
	
	render: function() {
		return (
			<div>
				<div>
					<h3>Adicionar</h3>
					<FormAdicionar onEmpresaSubmit={this.handleAddSubmit} />
				</div>
				<div>
					<h3>Deletar</h3>
					<FormDeletar onEmpresaSubmit={this.handleConfirmaDeleteSubmit} 
						onCancelaSubmit={this.handleCancelaDeleteSubmit} 
						id={this.state.empresSelecionada.id} 
						nome={this.state.empresSelecionada.nome} />
				</div>
				<div>
					<h3>Editar</h3>
					<FormEditar onEmpresaSubmit={this.handleEditSaveSubmit} 
						onCancelaSubmit={this.handleCancelaEditSubmit} 
						id={this.state.empresSelecionada.id} 
						nome={this.state.empresSelecionada.nome} />
				</div>
				<div>
					<div>
						<h3>Pesquisar</h3>
						<FormFiltrar onPesquisar={this.handleFiltrarSubmit} />
					</div>
					<div>
						<h3>Lista</h3>
						<EmpresaLista data={this.state.data} onEmpresaDeleteSubmit={this.handleDeleteSubmit} onEmpresaEditSubmit={this.handleEditSubmit} />
					</div>
				</div>
			</div>
		);
	 }
	
	//*************************
	//Fim funções de render
	//*************************
	
});

var EmpresaLista = React.createClass({
	handleDeleteSubmit: function(empresa) {
		this.props.onEmpresaDeleteSubmit(empresa);
	},
	handleEditSubmit: function(empresa) {
		this.props.onEmpresaEditSubmit(empresa);
	},
	render: function() {
		var empresasNodes = this.props.data.map(function(empresa)
			{
				return (
					<Empresa key={empresa.id} id={empresa.id} nome={empresa.nome} onEmpresaDeleteSubmit={this.handleDeleteSubmit} onEmpresaEditSubmit={this.handleEditSubmit} />
				);
			}.bind(this)
		);
		return (
				<table>
					<thead>
						<tr>
							<th>
								C&oacute;digo
							</th>
							<th>
								Nome
							</th>
							<th>
							</th>
							<th>
							</th>
						</tr>
					</thead>
					<tbody>
						{empresasNodes}
	    			</tbody>
				</table>
				);
	}
});

var Empresa = React.createClass({
	handleDeleteSubmit: function(e) {
		e.preventDefault();
		var id = this.refs.id.value.trim();
		var nome = this.refs.nome.value.trim();
		if (!id || !nome) {
		  return;
		}
		this.props.onEmpresaDeleteSubmit({id: id,nome: nome});
		this.refs.id.value = '';
		this.refs.nome.value = '';
		return;
	},
	handleEditSubmit: function(e) {
		e.preventDefault();
		var id = this.refs.id.value.trim();
		var nome = this.refs.nome.value.trim();
		if (!id || !nome) {
		  return;
		}
		this.props.onEmpresaEditSubmit({id: id,nome: nome});
		this.refs.id.value = '';
		this.refs.nome.value = '';
		return;
	},
	render: function()
	{
		return(
			<tr>
				<td>{this.props.id}</td>
				<td>{this.props.nome}</td>
				<td>
					<form onSubmit={this.handleEditSubmit}>
						<input type="hidden" value={this.props.id} ref="id" />
						<input type="hidden" value={this.props.nome} ref="nome" />
						<input type="submit" value="Editar" />
					</form>
				</td>
				<td>
					<form onSubmit={this.handleDeleteSubmit}>
						<input type="hidden" value={this.props.id} ref="id" />
						<input type="hidden" value={this.props.nome} ref="nome" />
						<input type="submit" value="Deletar" />
					</form>
				</td>
			</tr>
		);
	}
})

var FormDeletar = React.createClass({
	handleConfirmaSubmit: function(e) {
		e.preventDefault();
		var id = this.refs.id.value.trim();
		if (!id) {
		  return;
		}
		this.props.onEmpresaSubmit(id);
		this.refs.id.value = '';
		return;
	},
	handleCancelaSubmit: function(e){
		e.preventDefault();
		this.props.onCancelaSubmit();
		this.refs.id.value = '';
		return;
	},
	render: function()
	{
		return(
			<div>
				<form name="ConfirmaDeletar" onSubmit={this.handleConfirmaSubmit}>
					<input type="hidden" value={this.props.id} ref="id" />
					Confirma a remo&ccedil;&atilde;o da empresa {this.props.nome}?
					<br />
					ATEN&Ccedil;&Atilde;O: Esta a&ccedil;&atilde;o n&atilde;o poder&aacute; ser desfeita.
					<br />
					<input type="submit" value="Confirma" />
					<input type="submit" value="Cancela" onClick={this.handleCancelaSubmit} />
				</form>
			</div>
		);
	}
})

var FormEditar = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var id = this.refs.id.value.trim();
		var nome = this.refs.nome.value.trim();
		if (!id || !nome) {
		  return;
		}
		this.props.onEmpresaSubmit({id: id,nome: nome});
		this.refs.id.value = '';
		this.refs.nome.value = '';
		return;
	},
	handleChange: function(event) {
		this.props.nome= event.target.value;
	},
	handleCancelaSubmit: function(e){
		e.preventDefault();
		this.props.onCancelaSubmit();
		this.refs.id.value = '';
		return;
	},
	render: function()
	{
		return(
			<div>
				<form name="SalvarEditar" onSubmit={this.handleSubmit}  >
					ID: <input type="text" placeholder="id" ref="id" value={this.props.id} />
					<br />
					Nome: <input type="text" placeholder="nome" ref="nome" value={this.props.nome} onChange={this.handleChange} />
					<br />
					<input type="submit" value="Salvar" />
					<input type="submit" value="Cancela" onClick={this.handleCancelaSubmit} />
				</form>
			</div>
		);
	}
});

var FormAdicionar = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var id = this.refs.id.value.trim();
		var nome = this.refs.nome.value.trim();
		if (!id || !nome) {
		  return;
		}
		this.props.onEmpresaSubmit(id, nome, {id: id,nome: nome});
		this.refs.id.value = '';
		this.refs.nome.value = '';
		return;
	},
	render: function()
	{
		return(
			<form name="adicionar" onSubmit={this.handleSubmit}>
				ID: <input type="text" placeholder="id" ref="id" />
				<br />
				Nome: <input type="text" placeholder="nome" ref="nome" />
				<br />
				<input type="submit" value="Adicionar" />
			</form>
		);
	}
});

var FormFiltrar = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var filtro = this.refs.filtro.value.trim();
		this.props.onPesquisar(filtro);
	},
	render: function()
	{
		return(
			<form name="Deletar" onSubmit={this.handleSubmit}>
				Filtro: <input type="text" placeholder="filtro" ref="filtro" />
				<br />
				<input type="submit" value="Pesquisar" />
			</form>
		);
	}
});

var data = [ {id:"1", nome: "Expresso rio guaiba"}, {id:"2", nome: "Sogal"},{id:"3", nome: "Viacao pelicano"}];

//pollInterval={10000}
ReactDOM.render(
	<EmpresaBox data={data} pollInterval={200} />,
	document.getElementById('content')
);