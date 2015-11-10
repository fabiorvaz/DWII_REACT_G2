/**
 * 
 */
var EmpresaBox = React.createClass({
	handleEditSubmit: function(empresa) {
		this.setState({empresSelecionada: empresa});
		/*
		$.ajax({
			  url: "services/library/book/"+isbn,
			  dataType: 'json',
			  type: 'Edit',
			  success: function(data) {
				this.setState({data: data});
			  }.bind(this),
			  error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			  }.bind(this)
			});
			*/
	},
	handleEditSaveSubmit: function(empresa)
	{
		this.state.data.push(empresa);
		this.forceUpdate();
	},
	getInitialState: function() {
	    return {data: data, empresSelecionada:[]};
	},
	render: function() {
		return (
			<div>
				<div>
					<FormEditar onEmpresaSubmit={this.handleEditSaveSubmit} id={this.state.empresSelecionada.id} nome={this.state.empresSelecionada.nome} />
				</div>
				<div>
					<EmpresaLista data={this.state.data} onEmpresaSubmit={this.handleEditSubmit} />
				</div>
			</div>
		);
	}
});

var EmpresaLista = React.createClass({
	handleEditSubmit: function(empresa) {
		this.props.onEmpresaSubmit(empresa);
	},
	render: function() {
		var empresasNodes = this.props.data.map(function(empresa)
			{
				return (
					<Empresa key={empresa.id} id={empresa.id} nome={empresa.nome} onEmpresaSubmit={this.handleEditSubmit} />
				);
			}.bind(this)
		);
		return (
				<table>
					<thead>
						<tr>
							<th>
								Código
							</th>
							<th>
								Nome
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
	render: function()
	{
		return(
			<tr>
				<td>{this.props.id}</td>
				<td>{this.props.nome}</td>
				<td>
					<form onSubmit={this.handleSubmit}>
						<input type="hidden" value={this.props.id} ref="id" />
						<input type="hidden" value={this.props.nome} ref="nome" />
						<input type="submit" value="Editar" />
					</form>
				</td>
			</tr>
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
	render: function()
	{
		return(
			<form name="Salvar" onSubmit={this.handleSubmit}  >
				ID: <input type="text" placeholder="id" ref="id" value={this.props.id} />
				<br />
				Nome: <input type="text" placeholder="nome" ref="nome" value={this.props.nome} onChange={this.handleChange} />
				<br />
				<input type="submit" value="Salvar" />
			</form>
		);
	}
});

var data = [ {id:"1", nome: "Expresso rio guaíba"}, {id:"2", nome: "Sogal"},{id:"3", nome: "Viação pelicano"}];
//pollInterval={10000}
ReactDOM.render(
		<EmpresaBox data={data} />,
		document.getElementById('content')
		);