using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AshwniCarRental.Business.Model
{
    public class Ordertable
    {
        public int Id { get; set; }

        [ForeignKey("Product")]
        public int CarId { get; set; }
        public ProductModel _product { get; set; }
        public string UserEmail { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public double RentPrice { get; set; }
        public bool isOrderConfirmed { get; set; }
        public bool isReturned { get; set; }
  
    }
}
