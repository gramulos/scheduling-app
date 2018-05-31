﻿using System;
using System.Collections.Generic;

namespace SchedulingApp.Domain.Entities
{
    public class Category : AuditableEntity
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public Guid ParentId { get; set; }

        public ICollection<EventCategory> EventCategories { get; set; }
    }
}
