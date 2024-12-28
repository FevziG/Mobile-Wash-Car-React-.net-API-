using System;
using System.Collections.Generic;

namespace MOBİLECARWASHAPISON.Entities;

public partial class CwAdmin
{
    public Guid Id { get; set; }

    public string? Username { get; set; }

    public string? PasswordHash { get; set; }

    public bool? IsActive { get; set; }
}
