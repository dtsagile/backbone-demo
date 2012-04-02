using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections;
using System.Data;
using System.Diagnostics;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace BackboneDemo.Models
{
    public class UserAccount
    {
        public UserAccount()
        {
            this.Roles = new List<Role>();
        }
        //Membership required
        [Key()]
        public virtual Guid UserId { get; set; }
        [Required()]
        [MaxLength(20)]
        [DisplayName("User Name")]
        public virtual string Username { get; set; }
        [Required()]
        [MaxLength(250)]
        [DataType(DataType.EmailAddress)]
        public virtual string Email { get; set; }

        //[Required()]
        [MaxLength(100)]
        [DataType(DataType.Password)]
        public virtual string Password { get; set; }
        [DisplayName("Is Confirmed")]
        public virtual bool IsConfirmed { get; set; }
        [DisplayName("Password Failures Since Last Logon")]
        public virtual int PasswordFailuresSinceLastSuccess { get; set; }

        [DisplayName("Last Login Failure Date")]
        public virtual Nullable<DateTime> LastPasswordFailureDate { get; set; }
        public virtual string ConfirmationToken { get; set; }

        [DisplayName("Account Creation Date")]
        public virtual Nullable<DateTime> CreateDate { get; set; }
        public virtual Nullable<DateTime> PasswordChangedDate { get; set; }
        public virtual string PasswordVerificationToken { get; set; }
        public virtual Nullable<DateTime> PasswordVerificationTokenExpirationDate { get; set; }

        [MaxLength(100)]
        public string Affiliation { get; set; }

        public virtual ICollection<Role> Roles { get; set; }

        //Optional
        [DisplayName("First Name")]
        public virtual string FirstName { get; set; }
        [DisplayName("Last Name")]
        public virtual string LastName { get; set; }
        public virtual string TimeZone { get; set; }
        public virtual string Culture { get; set; }

        public virtual string Phone { get; set; }

        [DisplayName("User Must Change Password at Next Logon")]
        public bool RequirePasswordChange { get; set; }
    }
}