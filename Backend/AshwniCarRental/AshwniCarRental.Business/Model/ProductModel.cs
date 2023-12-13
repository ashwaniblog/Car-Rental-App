using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace AshwniCarRental.Business.Model
{
    public class ProductModel
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        [RegularExpression("^[a-zA-Z0-9]*$", ErrorMessage = "Only Alphabets and Numbers allowed.")]
        public string Car_Name { get; set; }

        [Required]
        [MaxLength(255)]
        [RegularExpression("^[a-zA-Z0-9]*$", ErrorMessage = "Only Alphabets and Numbers allowed.")]
        public string Car_Maker { get; set; }

        [Required]
        [MaxLength(100)]
        [RegularExpression("^[a-zA-Z0-9]*$", ErrorMessage = "Only Alphabets and Numbers allowed.")]
        public string Car_Category { get; set; }

        [Required]
        public int Available_Quantity { get; set; }

        public double Available_Discount { get; set; }

        [Display(Name = "Image")]
        [Required(ErrorMessage = "Pick an Image")]
        public string Image { get; set; }

        [Required]

        public double Rent_Price { get; set; }

        [MaxLength(100)]
        [RegularExpression("^[a-zA-Z0-9]*$", ErrorMessage = "Only Alphabets and Numbers allowed.")]
        public string Status { get; set; }

        [ForeignKey("CarId")]
        public ICollection<Ordertable> Orders { get; set; }
    }
}
