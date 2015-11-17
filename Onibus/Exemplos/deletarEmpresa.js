/**
 * 
 */
var EmpresaBox = React.createClass({
	handleDeleteSubmit: function(empresa) {
		this.setState({empresSelecionada: empresa});
		
		
		/*
		$.ajax({
			  url: "services/library/book/"+isbn,
			  dataType: 'json',
			  type: 'DELETE',
			  success: function(data) {
				this.setState({data: data});
			  }.bind(this),
			  error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			  }.bind(this)
			});
			*/
			
	},
	handleCancelaSubmit: function(empresa) {
		this.setState({empresSelecionada: []});
	},
	handleConfirmaDeleteSubmit: function(id){
		var rows = this.state.data.filter(function(elem) {
            return elem.id != id;
        });
		this.setState({data:rows, empresSelecionada: []});
		
	},
	getInitialState: function() {
	    return {data: data, empresSelecionada: []};
	},
	render: function() {
		return (
			<div>
				<div>
					<FormConfirmar onEmpresaSubmit={this.handleConfirmaDeleteSubmit} 
						onCancelaSubmit={this.handleCancelaSubmit} 
						id={this.state.empresSelecionada.id} 
						nome={this.state.empresSelecionada.nome} />
				</div>
				<div>
					<FormDeletar onEmpresaSubmit={this.handleDeleteSubmit} />
				</div>
				<div>
					<EmpresaLista data={this.state.data} onEmpresaSubmit={this.handleDeleteSubmit} />
				</div>
			</div>
		);
	}
});

var EmpresaLista = React.createClass({
	handleDeleteSubmit: function(id) {
		this.props.onEmpresaSubmit(id);
	},
	render: function() {
		var empresasNodes = this.props.data.map(function(empresa)
			{
				return (
					<Empresa id={empresa.id} nome={empresa.nome} onEmpresaSubmit={this.handleDeleteSubmit} />
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
						<input type="submit" value="Deletar" />
					</form>
				</td>
			</tr>
		);
	}
})

var FormDeletar = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var id = this.refs.id.value.trim();
		if (!id) {
		  return;
		}
		this.props.onEmpresaSubmit(id);
		this.refs.id.value = '';
		this.refs.nome.value = '';
		return;
	},
	render: function()
	{
		return(
			<form name="Deletar" onSubmit={this.handleSubmit}>
				ID: <input type="text" placeholder="id" ref="id" />
				<br />
				<input type="submit" value="Deletar" />
			</form>
		);
	}
});

var FormConfirmar = React.createClass({
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
				</form>
				<form name="CancelaDeletar" onSubmit={this.handleCancelaSubmit}>
					<input type="submit" value="Cancela" />
				</form>
			</div>
		);
	}
})

var data = [ {id:"1", nome: "Expresso rio guaíba"}, {id:"2", nome: "Sogal"},{id:"3", nome: "Viação pelicano"}];
//pollInterval={10000}
ReactDOM.render(
		<EmpresaBox data={data} pollInterval={200} />,
		document.getElementById('content')
		);