using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using TesteCrmall.Models;

namespace TesteCrmall.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ClienteController : ApiController
    {
        Contexto objEntity = new Contexto();

        [HttpGet]
        [Route("TodosClientes")]
        public IQueryable<Cliente> TodosClientes()
        {
            try
            {
                return objEntity.Clientes;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        [Route("GetClientePorId/{clienteId}")]
        public IHttpActionResult GetClientePorId(int clienteId)
        {
            Cliente clientePesquisado = new Cliente();
            try
            {
                clientePesquisado = objEntity.Clientes.Find(clienteId);
                if (clientePesquisado == null)
                {
                    return NotFound();
                }

            }
            catch (Exception e)
            {
                throw e;
            }

            return Ok(clientePesquisado);
        }

        [HttpPost]
        [Route("InserirCliente")]
        public IHttpActionResult InserirCliente(Cliente data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                objEntity.Clientes.Add(data);
                objEntity.SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }

            return Ok(data);
        }

        [HttpPut]
        [Route("AtualizarCliente")]
        public IHttpActionResult AtualizarCliente(Cliente clienteAAtualizar)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                Cliente objCliente = new Cliente();
                objCliente = objEntity.Clientes.Find(clienteAAtualizar.Id);
                if (objCliente != null)
                {
                    objCliente.Nome = clienteAAtualizar.Nome;
                    objCliente.Sexo = clienteAAtualizar.Sexo;
                    objCliente.DataDeNascimento = clienteAAtualizar.DataDeNascimento;
                    objCliente.Cep = clienteAAtualizar.Cep;
                    objCliente.Endereco = clienteAAtualizar.Endereco;
                    objCliente.Numero = clienteAAtualizar.Numero;
                    objCliente.Complemento = clienteAAtualizar.Complemento;
                    objCliente.Bairro = clienteAAtualizar.Bairro;
                    objCliente.Estado = clienteAAtualizar.Estado;
                    objCliente.Cidade = clienteAAtualizar.Cidade;
                }
                int i = this.objEntity.SaveChanges();

            }
            catch (Exception e)
            {
                throw e;
            }
            return Ok(clienteAAtualizar);
        }

        [HttpDelete]
        [Route("DeletarCliente")]
        public IHttpActionResult DeletarCliente(int id)
        {
            Cliente cliente = objEntity.Clientes.Find(id);
            if (cliente == null)
            {
                return NotFound();
            }

            objEntity.Clientes.Remove(cliente);
            objEntity.SaveChanges();

            return Ok(cliente);
        }
    }
}
