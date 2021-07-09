
	if (state.bRequireRemote && !state.bHaveRemote)
	{
		remoteErrors.push_back(CPart::GetWarning(L"REMOTE_MISSING", L"Warning: Missing light remote"));
	}
	else if (!state.bRequireRemote && state.bHaveRemote)
	{
		remoteErrors.push_back(CPart::GetWarning(L"REMOTE_UNUSED", L"Warning: Unused light remote"));
	}
	if (state.bRequireRGBRemote && !state.bHaveRGBRemote)
	{
		remoteErrors.push_back(CPart::GetWarning(L"REMOTE_MISSING_RGB", L"Warning: Missing RGB light remote"));
	}
	else if (!state.bRequireRGBRemote && state.bHaveRGBRemote)
	{
		remoteErrors.push_back(	CPart::GetWarning(L"REMOTE_UNUSED_RGB", L"Warning: Unused RGB light remote"));
	}