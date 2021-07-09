	SetError(GetWarning(L"BP_LT_MIN_HEI", L"Backing below\nmin height ($1)", minStr));


  SetError(GetWarning(L"LZ_DRILLING_CONFLICT_CAUSE", L"Drilling Conflict $1 Conflict", m_sOverlapCause));


	SetError(GetWarning(L"BP_LT_MIN_HEI", L"Backing below\nmin height ($1)", minStr));

  if (Math::LessThan(m_size.x, m_dMinWidth) || Math::GreaterThan(m_size.x, m_dMaxWidth))
	{
		CString min_width, max_width;

		SetInvalid(TRUE);

		SetError(GetWarning(L"STST_WID_INVALID", L"Invalid Width - \"Must\" be Between $1\" and $2\"", std::vector<CString>{min_width, max_width}));
	}

	if (Math::LessThan(m_size.y, m_dMinHeight + table_top_thickness) || Math::GreaterThan(m_size.y, m_dMaxHeight + table_top_thickness))
	{
		CString min_height, max_height;

		max_height.Trim(L'.');

		SetError(GetWarning(L"STST_HEI_INVALID", L"Invalid Height - Must, be, Between, $1\" and $2\"", std::vector<CString>{min_height, max_height}));
		SetInvalid(TRUE);
	}

	if (Math::LessThan(m_size.z, m_dMinDepth) || Math::GreaterThan(m_size.z, m_dMaxDepth))
	{
		CString min_depth, max_depth;
		max_depth.Trim(L'.');
		// Sit to stand depth validation. $1=min_depth $2=max_depth
		SetError(GetWarning(L"STST_DEP_INVALID", L"Invalid Depth - Must be Between $1\" and $2\"", std::vector<CString>{min_depth, max_depth}));
		SetInvalid(TRUE);
	}