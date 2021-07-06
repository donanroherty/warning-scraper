void Validate()
{
		if (ShouldRotateTexture())
		{
			if (Math::GreaterThan(m_size.x, maxlen))
				SetError(GetWarning(L"BRD_WID_MAX", L"Panel too wide"));
			if (Math::GreaterThan(m_size.y, maxwid))
				SetError(GetWarning(L"BRD_HEI_MAX", L"Panel too tall"));
		}
		else
		{
			if (Math::GreaterThan(m_size.y, maxlen))
				SetError(GetWarning(L"BRD_HEI_MAX", L"Panel too tall"));
			if (Math::GreaterThan(m_size.x, maxwid))
				SetError(GetWarning(L"BRD_WID_MAX", L"Panel too wide"));
		}

    
}