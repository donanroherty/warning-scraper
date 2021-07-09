	if (Virtuoso::UseBackingHeightWarning())
	{
		if (Math::GreaterThan(GetSize().y, max))
		{
			// Backing panel height exceeds SHEETS=>MAXLEN_MM
			SetError(GetWarning(L"BP_GT_MAX_HEI", L"Backing exceeds\nmax height"));
			SetInvalid(TRUE);
		}
		else if (Math::LessThan(GetSize().y, min))
		{
			auto minStr = CUtils::toText(CUtils::toUnit(min));
			if (CUtils::unitsToUse == CUtils::INCHES)
				minStr += L"\"";

			// Backing panel height is less than allowed minimum. $1 = min allow height
			SetError(GetWarning(L"BP_LT_MIN_HEI", L"Backing below\nmin height ($1)", minStr));
			SetInvalid(TRUE);
		}
	}