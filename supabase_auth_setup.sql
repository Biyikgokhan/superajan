-- 1. Add auth_user_id to tenants table
ALTER TABLE tenants ADD COLUMN IF NOT EXISTS auth_user_id UUID REFERENCES auth.users(id);
CREATE INDEX IF NOT EXISTS idx_tenants_auth_user_id ON tenants(auth_user_id);

-- 2. Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  period VARCHAR(7) NOT NULL,  -- '2026-04'
  amount NUMERIC(10,2) NOT NULL DEFAULT 1000.00,
  currency VARCHAR(3) NOT NULL DEFAULT 'USD',
  status VARCHAR(20) NOT NULL DEFAULT 'pending',  -- pending, paid, overdue
  paid_at TIMESTAMPTZ,
  payment_method VARCHAR(50),  -- card, transfer
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, period)
);

-- 3. RLS for payments
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Users can only read their own payments
CREATE POLICY "Users can view own payments" ON payments
  FOR SELECT USING (
    tenant_id IN (
      SELECT id FROM tenants WHERE auth_user_id = auth.uid()
    )
  );

-- Service role has full access (for admin operations)
CREATE POLICY "Service role full access" ON payments
  FOR ALL USING (true)
  WITH CHECK (true);

-- 4. RLS policy for tenants (users can read their own tenant)
CREATE POLICY "Users can view own tenant" ON tenants
  FOR SELECT USING (auth_user_id = auth.uid());
