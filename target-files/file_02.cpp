if (!pars.second)
		{
			auto dz = GetDesignZone();
			if (dz)
			{

				auto wall = dz->GetWall();
				if (wall && wall->IsIsland())
				{
					if (!Math::Equal(GetRightX(), GetDesignZone()->GetSize().x))
						SetError(GetWarning(L"COMP_NO_RIGHT_PAR", L"Missing right partition"));
				}
				else
				{
					BOOL bLeft = FALSE;
					auto result = GetAdjacentComponent(bLeft);
					if (!result.second || bLeft)
						SetError(GetWarning(L"COMP_NO_RIGHT_PAR", L"Missing right partition"));
				}
			}
		}

		if (IsWallMounted() && !m_bSuspendRail && GetDatabase().IsSuspendWallMountWarningEnabled())
		{
			SetError(GetWarning(L"COMP_SUSP_RAIL_REQ", L"Suspension rail required"));
			SetInvalid(TRUE);
		}