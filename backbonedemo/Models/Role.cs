using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace BackboneDemo.Models
{
    public class Role
    {
        //Membership required
        [Key()]
        public virtual Guid RoleId { get; set; }
        [Required()]
        [MaxLength(100)]
        public virtual string RoleName { get; set; }

        public virtual ICollection<UserAccount> Users { get; set; }

        //Optional
        [MaxLength(250)]
        public virtual string Description { get; set; }

        public override string ToString()
        {
            return this.RoleId.ToString();
        }
    }
}