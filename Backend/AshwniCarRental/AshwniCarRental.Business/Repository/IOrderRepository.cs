using AshwniCarRental.Business.Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AshwniCarRental.Business.Repository
{
    public interface IOrderRepository
    {
        Task<int> AddCartOrder(Ordertable _event);
        Task<Ordertable> DeleteCartProduct(Ordertable product);
        Task<Ordertable> EditCart(Ordertable _product);
        Task<Ordertable> EditRentalAgreement(Ordertable _product);
        Task<List<Ordertable>> GetAllCartProducts();

        Task<IEnumerable<Object>> GetAllRentalAgreement();
        Task<Ordertable> GetCartProductById(int CarId);
        bool IsAvailable(int Id);
    }
}